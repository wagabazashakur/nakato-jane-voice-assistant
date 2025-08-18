# Deploy the Nakato TTS Server Online

This server powers true voice cloning for your web app. Host it online so any Android phone can use it over HTTPS.

## Options

### 1) Hugging Face Spaces (Docker)
- Repo type: Space (Docker)
- Add these files in your space:
  - `Dockerfile` (use the server/Dockerfile in this project)
  - `requirements.txt` (use server/requirements.txt)
  - `server/` directory with `main.py`
- Set `TTS_MOCK=1` initially to validate; unset for real XTTS after adding proper resources.
- Exposed URL will be like `https://<space>.hf.space`; your TTS endpoint will be `https://<space>.hf.space/tts`.

### 2) Railway / Fly.io (Docker)
- Connect this repo and deploy using the `server/Dockerfile`.
- Health check: `GET /health` returns `{ ok: true }`.
- Use the assigned public URL + `/tts` in your app.

### 3) VPS + Caddy (Let’s Encrypt)
- Build and run container:
  - `docker build -t nakato-tts -f server/Dockerfile .`
  - `docker run -d --name nakato-tts -p 8000:8000 nakato-tts`
- Put Caddy in front for HTTPS:
  ```
  example.com {
    reverse_proxy 127.0.0.1:8000
  }
  ```
- Your TTS URL: `https://example.com/tts`.

## After deploy
- In the web app, tap "Set HTTPS TTS URL" and paste `https://your-domain/tts`.
- Tap "🔥 Warm Up" then "🧪 Test TTS".

## Notes
- Real XTTS requires CPU/GPU resources; start with `TTS_MOCK=1` to verify wiring.
- CORS is open for cross-origin access.
