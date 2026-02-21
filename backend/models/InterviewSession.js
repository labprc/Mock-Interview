const mongoose = require('mongoose');

const interviewSessionSchema = new mongoose.Schema({
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
  fieldName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'abandoned'],
    default: 'active'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  answers: [{
    questionId: String,
    answer: String,
    timeSpent: Number,
    submittedAt: Date
  }],
  outOfFrameWarnings: {
    type: Number,
    default: 0
  },
  isEliminated: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);
