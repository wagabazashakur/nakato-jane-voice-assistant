from fastapi import FastAPI, UploadFile, File, Form, Response
from fastapi.middleware.cors import CORSMiddleware
import io
import os
import tempfile
import math
import struct

# Optional: load Coqui TTS (XTTS v2) lazily
_TTS = None
_SPEAKER_WAV = None
_MOCK = os.getenv("TTS_MOCK", "0") == "1"

app = FastAPI(title="Nakato Local TTS", version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _lazy_load_tts():
    global _TTS, _MOCK
    if _TTS is None and not _MOCK:
        try:
            from TTS.api import TTS
            # XTTS v2 multilingual voice cloning model
            _TTS = TTS(model_name="tts_models/multilingual/multi-dataset/xtts_v2")
        except Exception:
            # Fallback to mock mode if TTS cannot be loaded (e.g., Py 3.13 / torch not installed)
            _MOCK = True
    return _TTS


def _ensure_wav_mono16k(path: str) -> str:
    """Best-effort: if pydub is available, convert to WAV mono 16k; else return original."""
    try:
        from pydub import AudioSegment  # lazy import
        seg = AudioSegment.from_file(path)
        seg = seg.set_channels(1).set_frame_rate(16000)
        out_path = path + ".wav"
        seg.export(out_path, format="wav")
        return out_path
    except Exception:
        return path


def _mock_tone_wav(duration_ms: int = 700, sr: int = 16000) -> bytes:
    """Generate a short two-tone WAV (440Hz then 660Hz) without external deps."""
    out = io.BytesIO()
    import wave
    with wave.open(out, 'wb') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)  # 16-bit
        wf.setframerate(sr)
        total = int(sr * duration_ms / 1000)
        for n in range(total):
            # first half 440Hz, second half 660Hz
            freq = 440 if n < total // 2 else 660
            # simple sine
            val = int(32767 * 0.25 * math.sin(2 * math.pi * freq * (n / sr)))
            wf.writeframes(struct.pack('<h', val))
    return out.getvalue()


@app.post("/tts")
async def tts_endpoint(text: str = Form(...), voice: UploadFile | None = File(None)):
    tts = _lazy_load_tts()

    # Prepare speaker audio (if provided)
    speaker_wav_path = None
    if voice is not None:
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(voice.filename)[1] or ".wav") as tmp:
            content = await voice.read()
            tmp.write(content)
            speaker_wav_path = tmp.name
        # Convert non-wav formats (e.g., m4a/3gp) to wav mono 16k for the model
        speaker_wav_path = _ensure_wav_mono16k(speaker_wav_path)
    
    # Generate audio (mock or real)
    try:
        wav_bytes = io.BytesIO()
        if _MOCK or tts is None:
            wav_bytes.write(_mock_tone_wav())
        else:
            if speaker_wav_path:
                wav = tts.tts(text=text, speaker_wav=speaker_wav_path, language="en")
            else:
                wav = tts.tts(text=text, language="en")
            # Determine sample rate if available; otherwise assume 22050 Hz
            sample_rate = getattr(getattr(tts, 'synthesizer', None), 'output_sample_rate', 22050)
            # Write wav with the correct sample rate
            import soundfile as sf
            sf.write(wav_bytes, wav, sample_rate, format='WAV')
        audio_data = wav_bytes.getvalue()
    finally:
        if speaker_wav_path and os.path.exists(speaker_wav_path):
            os.unlink(speaker_wav_path)

    return Response(content=audio_data, media_type="audio/wav")


@app.get("/tts")
async def tts_get_help():
    html = (
        "<html><body><h3>Nakato TTS Endpoint</h3>"
        "<p>This endpoint expects a POST multipart/form-data request:</p>"
        "<pre>fields: text (required), voice (optional file)</pre>"
        "<p>Example (PowerShell):</p>"
        "<pre>Invoke-WebRequest -UseBasicParsing -OutFile t.wav -Method Post -Body @{ text='hello' } https://your-url/tts</pre>"
        "</body></html>"
    )
    return Response(content=html, media_type="text/html")


@app.get("/")
async def root():
    return {"ok": True, "model": ("mock" if _MOCK else "xtts_v2"), "endpoints": ["POST /tts", "GET /health", "GET /warmup"], "https": True}


@app.get("/health")
async def health():
    return {"ok": True}


@app.get("/warmup")
async def warmup():
    # Trigger model load so first real request is fast
    _lazy_load_tts()
    return {"ok": True, "warmed": True}
