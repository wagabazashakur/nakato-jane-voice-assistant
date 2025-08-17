# Voice Cloning Setup for Nakato Jane

## Free Voice Cloning Options:

### 1. ElevenLabs (Recommended - Free Tier)
- **Website**: https://elevenlabs.io
- **Free tier**: 10,000 characters per month
- **Steps**:
  1. Sign up for free account
  2. Upload 1-5 minutes of Nakato Jane's voice samples
  3. Train custom voice (takes 5-10 minutes)
  4. Get API key and Voice ID
  5. Update the HTML file with your credentials

### 2. Coqui TTS (Completely Free)
- **Website**: https://coqui.ai
- **Open source**: Run locally
- **Steps**:
  1. Record 10-20 voice samples of Nakato Jane
  2. Install Coqui TTS locally
  3. Train voice model
  4. Integrate with web app

### 3. Tortoise TTS (Free but Complex)
- **GitHub**: https://github.com/neonbjb/tortoise-tts
- **Steps**:
  1. Record voice samples
  2. Setup Python environment
  3. Train model locally
  4. Create API endpoint

## Quick Setup Instructions:

### For ElevenLabs (Easiest):

1. **Record Nakato Jane's voice**:
   - 5-10 sentences reading different texts
   - Clear audio, no background noise
   - 30 seconds to 5 minutes total

2. **Create ElevenLabs account**:
   ```
   https://elevenlabs.io/speech-synthesis
   ```

3. **Upload voice samples**:
   - Click "Add Voice"
   - Upload audio files
   - Name it "Nakato Jane"
   - Train the voice

4. **Get credentials**:
   - Copy your API key
   - Copy the Voice ID for Nakato Jane

5. **Update the HTML file**:
   ```javascript
   const ELEVENLABS_API_KEY = 'your_actual_api_key_here';
   const VOICE_ID = 'nakato_jane_voice_id_here';
   ```

### Voice Recording Tips:

**What Nakato Jane should say**:
```
"Hello, I'm Nakato Jane, a professional waitress at Hilton Suites."
"I have over five years of experience in hospitality and customer service."
"I speak English, Arabic, and Luganda fluently."
"I'm passionate about creating exceptional dining experiences for guests."
"Thank you for considering me for your hospitality team."
```

**Recording quality**:
- Use a quiet room
- Speak naturally and clearly
- Record with phone or computer microphone
- Save as WAV or MP3 format

## Implementation Steps:

1. **Record Nakato Jane's voice** (5 minutes)
2. **Sign up for ElevenLabs** (2 minutes)
3. **Upload and train voice** (10 minutes)
4. **Update HTML with credentials** (1 minute)
5. **Test the voice assistant** (immediate)

## Cost:
- **ElevenLabs Free Tier**: 10,000 characters/month (FREE)
- **GitHub Pages Hosting**: FREE forever
- **Total Cost**: $0

## Result:
Your Android phone will hear Nakato Jane's actual cloned voice speaking about her waitress experience at Hilton Suites!

## Security Note:
Never commit API keys to public repositories. For production, use environment variables or secure key management.
