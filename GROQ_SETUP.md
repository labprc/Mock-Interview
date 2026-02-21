# Groq API Setup Guide

## What is Groq?
Groq is a fast inference engine for Large Language Models (LLMs). It provides free API access to powerful models like Mixtral-8x7b, perfect for rapid answer evaluation in your interview application.

## ✅ Benefits
- **Fast**: Extremely quick response times (perfect for real-time evaluation)
- **Free**: Generous free tier with competitive pricing
- **Reliable**: 99.99% uptime SLA
- **Easy**: Simple REST API similar to OpenAI

## 🚀 Setup Steps

### Step 1: Create Groq Account
1. Go to [Groq Console](https://console.groq.com)
2. Sign up with your email or GitHub account
3. Verify your email

### Step 2: Create API Key
1. Navigate to **API Keys** section in dashboard
2. Click **Create API Key**
3. Copy the generated API key
4. Save it securely

### Step 3: Add to Environment
1. Open `config/.env` file
2. Replace `your_groq_api_key_here` with your actual API key:
   ```
   GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxy
   ```
3. Save the file

### Step 4: Test the Integration
1. Start backend: `cd backend && npm start`
2. Run an interview and submit answers
3. Check evaluation results in browser console

## 📊 Available Models

| Model | Speed | Quality | Use Case |
|-------|-------|---------|----------|
| mixtral-8x7b-32768 | ⚡⚡⚡ | 🌟🌟🌟 | Answer Evaluation |
| llama2-70b-4096 | ⚡⚡ | 🌟🌟🌟🌟 | Complex Evaluation |
| gemma-7b-it | ⚡⚡⚡ | 🌟🌟 | Quick Tasks |

**Current Setting**: `mixtral-8x7b-32768` (Recommended for speed & accuracy)

## 🎯 Free Tier Limits
- **Requests**: 14,400 per day
- **Tokens**: Unlimited processing
- **Rate**: ~600 requests/hour
- ✅ **Enough for**: 576 full interviews/day (assuming 25 questions each)

## 🔒 Permissions Required

### Camera Permission
- **Purpose**: Monitor candidate position during interview
- **For**: Out-of-frame detection (3-strike elimination)
- **Privacy**: Video is processed locally; not sent to servers

### Microphone Permission
- **Purpose**: Capture speech for answer recording
- **For**: Converting speech to text using Web Speech API
- **Privacy**: Audio is processed locally; not sent to servers

**Note**: Users will see browser permission dialogs when starting an interview. They must grant both permissions to participate.

## 🧪 Testing Your Setup

```bash
# Start backend
cd backend
npm start

# In another terminal, start frontend
cd frontend
npm start

# Go to http://localhost:3000
# 1. Signup/Login
# 2. Select Interview Field
# 3. Grant camera & microphone permissions
# 4. Answer questions
# 5. Check evaluation results
```

## ❌ Troubleshooting

### "Invalid API Key" Error
- Check your key is correctly copied from Groq console
- Ensure no extra spaces before/after the key
- Verify the key starts with `gsk_`

### "Rate Limit Exceeded"
- Way on 1 minute before retry
- Upgrade to paid plan if needed
- Current: 14,400 requests/day

### "No Permissions" Error
- Browser blocked camera/microphone access
- Check browser settings → Privacy → Camera/Microphone
- Allow access for localhost:3000

### "Face Detection Failed"
- Ensure good lighting
- Position face clearly in camera frame
- TensorFlow.js model loads on first use (takes ~2 seconds)

## 💡 Tips

1. **During Interview**: Keep your face centered in camera frame
2. **Speak Clearly**: For better speech recognition
3. **Network**: Ensure stable internet connection
4. **Browser**: Use latest Chrome/Edge/Firefox for best compatibility

## 🔗 Useful Links

- [Groq Console](https://console.groq.com) - Get/manage API keys
- [Groq API Docs](https://console.groq.com/docs/speech-text) - API documentation
- [Groq Status](https://status.groq.com) - Check service status
- [Support Email](mailto:support@groq.com) - Get help

## 📝 Privacy & Security

✅ **Privacy**:
- Camera/microphone accessed locally only
- No video/audio sent to evaluation servers
- Answers sent for AI evaluation only

✅ **Security**:
- API key stored in backend environment variable
- Never expose key in frontend code
- HTTPS recommended for production

---

**Ready to evaluate interviews with Groq!** 🚀
