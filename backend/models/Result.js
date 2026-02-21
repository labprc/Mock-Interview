const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fieldId: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  partialAnswers: {
    type: Number,
    default: 0
  },
  marksObtained: {
    type: Number,
    default: 0
  },
  totalMarks: {
    type: Number,
    default: 100
  },
  percentage: {
    type: Number,
    default: 0
  },
  feedback: {
    type: String
  },
  evaluationDetails: [{
    questionId: String,
    question: String,
    userAnswer: String,
    expectedAnswer: String,
    marks: Number,
    feedback: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', resultSchema);
