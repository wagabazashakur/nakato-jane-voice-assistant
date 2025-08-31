# Nakato Jane Voice Assistant

A web-based voice assistant for hospitality interviews, using Jane's cloned voice and OpenAI fallback.

## Features
- Answers predefined interview questions with Jane's voice
- Falls back to OpenAI for other questions
- Synthesizes fallback answers in Jane's voice via TTS
- Modern chat UI, runs in browser, can be wrapped as PWA/Electron

## Setup
1. **Serve securely:**
   - Use `python -m http.server` or deploy to Vercel/Netlify. Microphone access requires HTTPS or `http://localhost`.
2. **Configure API keys:**
   - Supply OpenAI and Azure TTS keys via environment variables or config (do not hard-code in frontend).
   - Example: Set `window.OPENAI_API_KEY`, `window.AZURE_TTS_KEY`, and `window.AZURE_REGION` in a config script loaded before `script.js`.
3. **Replace/update Jane’s voice files:**
   - Add/replace files in the `audio/` folder. Update `responses` in `script.js`.
4. **Custom voice model:**
   - To use Azure Custom Voice, train a model and update the voice name in `synthesizeJaneVoice()`.
   - See [Microsoft docs](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/custom-neural-voice)

## PWA/Desktop/Teams
- Wrap as PWA (add manifest, service worker)
- Integrate into Teams via webview

## Error Handling
- Microphone errors are shown in the UI
- API errors show a default apology

## Notes
- Training a custom voice requires recorded samples and service approval
- All API calls are async for UI responsiveness
