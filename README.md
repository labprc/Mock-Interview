<<<<<<< HEAD
# AI Interview Mock Test Application

A comprehensive web application for conducting AI-powered mock interviews with real-time video monitoring, speech recognition, and AI-based answer evaluation.

## 🎯 Features

- **5 Interview Fields**: Software Development, Data Science, DevOps, Machine Learning, Cloud Architecture
- **Real-time Video Monitoring**: Camera feed with out-of-frame detection
- **Speech Recognition**: Automatic speech-to-text conversion
- **AI Evaluation**: Answers evaluated by AI (OpenAI, Google Cloud, or Azure)
- **User Authentication**: Secure login and signup system
- **Performance Tracking**: Detailed feedback and results analysis
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Project Structure

```
ai-interview-app/
├── frontend/                 # React.js frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API and utility services
│   │   ├── styles/          # CSS files
│   │   ├── utils/           # Helper functions
│   │   └── App.jsx          # Main app component
│   └── package.json
├── backend/                  # Node.js/Express backend
│   ├── controllers/         # Request handlers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Express middleware
│   ├── services/            # Business logic
│   ├── server.js            # Main server file
│   └── package.json
├── public/                  # Static files
│   └── questions/           # Interview questions JSON
├── config/                  # Configuration files
│   ├── .env                # Environment variables
│   └── .env.example        # Example config
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ai-interview-app
```

2. **Setup Backend**
```bash
cd backend
npm install
```

3. **Setup Frontend**
```bash
cd frontend
npm install
```

4. **Environment Configuration**
```bash
# Copy and configure .env file
cp config/.env.example config/.env
```

### Configuration

Edit `config/.env` with your API keys:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `OPENAI_API_KEY`: OpenAI API key (for answer evaluation)
- `GOOGLE_CLOUD_SPEECH_KEY`: Google Cloud credentials
- `AZURE_SPEECH_KEY`: Azure credentials

### Running the Application

1. **Start MongoDB**
```bash
mongod
```

2. **Start Backend Server**
```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

3. **Start Frontend Development Server**
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## 🎤 How to Use

1. **Sign Up**: Create an account with your email and password
2. **Select Field**: Choose an interview field from the available options
3. **Start Interview**: Click "Start Interview" to begin
4. **Camera Setup**: Ensure your webcam is properly positioned
5. **Answer Questions**: 
   - Listen to the question (auto-play or manual play)
   - Click "Start" to begin recording
   - Speak your answer clearly
   - Click "Stop" when done
   - Click "Submit Answer" to save
6. **Review Results**: Get AI-powered feedback and performance metrics

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Interview
- `POST /api/interview/start` - Start interview session
- `GET /api/interview/questions/:fieldId` - Get questions for field
- `POST /api/interview/answer` - Submit answer
- `POST /api/interview/end` - End interview session
- `GET /api/interview/results/:sessionId` - Get interview results

### Results
- `GET /api/results/:sessionId` - Get result details
- `GET /api/results/user/all` - Get all user results

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes with middleware
- CORS configuration
- Input validation

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎨 Design Features

- Clean and modern UI
- Smooth animations and transitions
- Gradient backgrounds
- Responsive grid layout
- Color-coded feedback system

## 🤖 AI Integration

The application supports integration with:
- **OpenAI GPT**: For answer evaluation
- **Google Cloud Speech-to-Text**: For speech recognition
- **Azure Cognitive Services**: For speech and evaluation

## 📊 Evaluation System

- Answers are evaluated out of 100 marks
- Grades: A+ (90+), A (80+), B (70+), C (60+), D (50+), F (<50)
- Detailed feedback on each answer
- Overall performance analysis

## 🐛 Troubleshooting

### Camera not working
- Check camera permissions
- Ensure no other app is using the camera
- Restart the browser

### Microphone not detected
- Check microphone permissions
- Verify device is connected properly
- Check browser settings

### API Connection Error
- Ensure backend server is running
- Check MongoDB connection
- Verify .env configuration

## 🔄 Monitoring Out-of-Frame

The system tracks when users leave the camera frame:
- 1st warning: Alert notification
- 2nd warning: Increased alert
- 3rd warning: User automatically eliminated from interview

## 📝 Interview Questions

Questions are stored in `public/questions/interview_questions.json` and include:
- Question text
- Audio file URL
- Expected keywords for evaluation
- Time duration for answer

## 🚀 Deployment

### Deploy Backend to Heroku
```bash
cd backend
heroku create app-name
git push heroku main
```

### Deploy Frontend
```bash
cd frontend
npm run build
# Deploy the build/ folder to your hosting service
```

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributors

- Your name/team

## 📞 Support

For issues and questions, please create an issue in the repository.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [OpenAI API](https://openai.com/api)

---

Happy Interviewing! 🎯
=======
# Mock-Interview
>>>>>>> 4d9f1ac6d204547bd87ca5af352d3639c69fc47c
