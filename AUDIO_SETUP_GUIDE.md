# AI Interview Audio Setup Guide

## 📋 Overview
Your application requires **25 MP3 audio files** - exactly **5 per field** for all 5 interview domains.

## 🎯 Required Audio Files

### **Field 1: Software Development (5 files)**
- `software_dev_q1.mp3` - "What are the SOLID principles in object-oriented programming?"
- `software_dev_q2.mp3` - "Explain the difference between synchronous and asynchronous programming."
- `software_dev_q3.mp3` - "What is a RESTful API and what are its key principles?"
- `software_dev_q4.mp3` - "What are the benefits and drawbacks of microservices architecture?"
- `software_dev_q5.mp3` - "What is version control and why is it important?"

### **Field 2: Data Science (5 files)**
- `data_science_q1.mp3` - "What is the difference between supervised and unsupervised learning?"
- `data_science_q2.mp3` - "What is overfitting and how can we prevent it?"
- `data_science_q3.mp3` - "Explain the steps in a typical data science project."
- `data_science_q4.mp3` - "What are the differences between correlation and causation?"
- `data_science_q5.mp3` - "How do you handle missing data in a dataset?"

### **Field 3: DevOps (5 files)**
- `devops_q1.mp3` - "What is CI/CD and why is it important?"
- `devops_q2.mp3` - "What is containerization and why use Docker?"
- `devops_q3.mp3` - "Explain the concept of Infrastructure as Code (IaC)."
- `devops_q4.mp3` - "What are the key differences between Git workflow strategies?"
- `devops_q5.mp3` - "How do you monitor and log applications in production?"

### **Field 4: Machine Learning (5 files)**
- `machine_learning_q1.mp3` - "What is the difference between precision and recall?"
- `machine_learning_q2.mp3` - "Explain how neural networks work and what are layers?"
- `machine_learning_q3.mp3` - "What is transfer learning and when should we use it?"
- `machine_learning_q4.mp3` - "How do decision trees work and what are their advantages?"
- `machine_learning_q5.mp3` - "What is hyperparameter tuning and why is it important?"

### **Field 5: Cloud Architecture (5 files)**
- `cloud_architecture_q1.mp3` - "What is cloud computing and what are its service models?"
- `cloud_architecture_q2.mp3` - "Explain the difference between public, private, and hybrid clouds."
- `cloud_architecture_q3.mp3` - "What are the best practices for designing scalable cloud architectures?"
- `cloud_architecture_q4.mp3` - "How do you ensure security and compliance in cloud environments?"
- `cloud_architecture_q5.mp3` - "What are the cost optimization strategies for cloud infrastructure?"

## 📁 File Location
Place all 25 MP3 files in:
```
c:\Users\vedan\OneDrive\Desktop\mock\frontend\public\audio\
```

## 🎙️ How to Generate Audio (Free Options)

### **Option 1: Google Text-to-Speech (FREE)**
- Free tier: 5 million characters per month
- Website: https://cloud.google.com/text-to-speech
- Steps:
  1. Get free API key
  2. Use Python/Node.js script to generate MP3s
  3. Download and place in audio folder

### **Option 2: Natural Reader (FREE)**
- Website: https://www.naturalreader.com/
- Free online text-to-speech
- No registration required
- Steps:
  1. Paste question text
  2. Select voice and language
  3. Download MP3

### **Option 3: ElevenLabs (FREE)**
- Website: https://elevenlabs.io/
- Good quality natural voices
- Free tier available
- Steps:
  1. Create account
  2. Use API to generate audio files
  3. Download MP3s

### **Option 4: Local TTS (FREE - No API Key)**
Using Python with offline libraries:
```python
from pyttsx3 import init
import os

# Initialize text-to-speech engine
engine = init()
engine.setProperty('rate', 150)  # Speech rate

questions = {
    "software_dev_q1": "What are the SOLID principles...",
    "software_dev_q2": "Explain the difference between...",
    # ... all 25 questions
}

for filename, text in questions.items():
    engine.save_to_file(text, f'{filename}.mp3')

engine.runAndWait()
```

## 📝 Configuration

The application automatically reads audio paths from:
```
frontend/public/questions/interview_questions.json
```

Each question already has the correct audio path configured:
```json
{
  "id": "q1",
  "text": "What are the SOLID principles...",
  "audioUrl": "/audio/software_dev_q1.mp3",  // ← Path to your MP3
  "duration": 120
}
```

## ✅ Verification Checklist

- [ ] Created `frontend/public/audio/` folder
- [ ] Generated all 25 MP3 files
- [ ] Named files exactly as specified (case-sensitive)
- [ ] Placed all files in the audio folder
- [ ] MP3 files are properly encoded (readable by browser)
- [ ] File sizes are reasonable (< 2MB each ideally)
- [ ] No API keys needed in .env for audio playback

## 🔊 Testing Audio Playback

1. Start the frontend: `npm start`
2. Navigate to any interview
3. Click "Play Question" button
4. Audio should play through browser speakers

If audio doesn't play:
- Check browser console for errors
- Verify audio file format is MP3
- Check file permissions
- Ensure correct file path in JSON config

## 💾 File Format Specifications

- **Format**: MP3 (MPEG Layer III)
- **Sample Rate**: 44.1 kHz or higher
- **Bit Rate**: 128 kbps or higher
- **Mono/Stereo**: Either is fine
- **Duration**: 10-30 seconds per question

## 📞 Troubleshooting

### Audio file not found
- Check file path in JSON config
- Verify file exists in `frontend/public/audio/`
- Check file name spelling (case-sensitive)

### Audio doesn't play
- Ensure browser has audio playing enabled
- Check browser console for errors
- Try different browser (Chrome, Firefox)
- Verify MP3 file is not corrupted

### Browser can't decode audio
- Convert to MP3 using: ffmpeg, Audacity, or online converter
- Verify MP3 bitrate is at least 128kbps

## 🎬 Next Steps

1. Generate all 25 audio files using one of the methods above
2. Place files in `frontend/public/audio/`
3. Test by playing questions during interview
4. All evaluation still works without API keys (keyword-based fallback)

---

**Total Setup Time**: ~1-2 hours to generate all audio files  
**Cost**: FREE (using free TTS services)  
**API Keys Required**: ZERO for audio playback
