# Nakato Jane Voice Assistant

<<<<<<< HEAD
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
=======
A complete Flutter mobile voice assistant app featuring automatic speech recognition and voice responses from Nakato Jane, a professional waitress and hostess.

## Features

🎤 **Automatic Speech Recognition** - Tap and speak naturally  
🗣️ **Voice Responses** - Hear Nakato Jane's voice answers  
🤖 **AI Integration** - Connected to backend CV knowledge base  
📱 **Mobile Optimized** - Native Android app experience  
🎯 **Professional Focus** - Ask about work experience, skills, and background  

## How to Use

1. **Tap the microphone button** to start listening
2. **Speak your question** (e.g., "Tell me about your work experience")
3. **Wait for processing** - the app converts speech to text
4. **Listen to Nakato Jane's response** - automatic voice playback
5. **Ask follow-up questions** - completely hands-free!

## Example Questions

- "Tell me about yourself"
- "What is your work experience?"
- "What skills do you have?"
- "Tell me about your certifications"
- "What languages do you speak?"
- "How can I contact you?"

## Technical Requirements

### Backend Server
- FastAPI server running on network IP: `172.21.238.186:8000`
- TTS (Text-to-Speech) service with Edge TTS
- CV knowledge base integration
- Audio response generation

### Mobile App
- Flutter 3.35.1+
- Android SDK 21+
- Microphone and internet permissions
- Speech-to-text capabilities
- Audio playback functionality

## Installation

### Prerequisites
1. **Flutter SDK** installed and configured
2. **Android development tools** (Android Studio/SDK)
3. **Backend server running** on the network

### Build APK
```bash
# Install dependencies
flutter pub get

# Build APK for Android
flutter build apk --release

# Install on connected device
flutter install
```

### Network Setup
- Ensure your phone and computer are on the same WiFi network
- Backend server accessible at: `http://172.21.238.186:8000`
- Firewall configured to allow port 8000

## Project Structure

```
nakato_jane_voice_assistant/
├── lib/
│   └── main.dart                 # Main app with voice UI
├── android/
│   └── app/
│       ├── build.gradle         # Android build configuration
│       └── src/main/
│           └── AndroidManifest.xml # Android permissions
├── pubspec.yaml                 # Flutter dependencies
└── README.md                    # This file
```

## Dependencies

- **speech_to_text**: Voice recognition
- **just_audio**: Audio playback
- **http**: Backend API communication
- **permission_handler**: Android permissions
- **path_provider**: File system access

## Voice Assistant Workflow

1. **User taps microphone** → App requests microphone permission
2. **Speech recognition starts** → Converts voice to text
3. **Question sent to backend** → POST /ask endpoint
4. **Nakato Jane processes** → AI generates response based on CV
5. **Audio response returned** → WAV file from TTS service
6. **Automatic playback** → User hears Nakato Jane's voice

## Permissions

The app requires these Android permissions:
- `RECORD_AUDIO` - For speech recognition
- `INTERNET` - For backend communication
- `WRITE_EXTERNAL_STORAGE` - For temporary audio files
- `READ_EXTERNAL_STORAGE` - For accessing audio files

## Backend API

### Endpoint: POST /ask
```json
{
  "question": "Tell me about your work experience"
}
```

**Response**: Audio file (WAV) with Nakato Jane's voice answer

## Development

### Run in Development
```bash
flutter run
```

### Debug Mode
```bash
flutter run --debug
```

### Release Build
```bash
flutter build apk --release
```

## Troubleshooting

### Common Issues

**"Could not reach Nakato Jane"**
- Check network connectivity
- Verify backend server is running
- Confirm IP address: `172.21.238.186:8000`

**"Microphone permission denied"**
- Go to Settings → Apps → Nakato Jane → Permissions
- Enable Microphone permission

**"Network connection failed"**
- Ensure phone and computer on same WiFi
- Check Windows Firewall settings
- Verify port 8000 is accessible

### Network Testing
Test backend connectivity:
```bash
# From computer
curl http://172.21.238.186:8000/docs

# From phone browser
http://172.21.238.186:8000/docs
```

## About Nakato Jane

Nakato Jane is a professional waitress and hostess with 5+ years of experience at Hilton Suites. This voice assistant provides information about her:

- Professional work experience
- Hospitality skills and certifications
- Language abilities (English, Arabic, Luganda)
- Contact information and availability
- Customer service expertise

## Contact & Support

For technical support or questions about the voice assistant, please refer to the project documentation or contact the development team.

---

**Built with Flutter 💙 | Powered by FastAPI 🚀 | Voice by Edge TTS 🎤**
>>>>>>> 25e6dfdc42a58f9773e2aa11798e2cc975cb9123
