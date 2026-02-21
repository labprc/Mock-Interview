const InterviewSession = require('../models/InterviewSession');
const Result = require('../models/Result');
const aiEvaluationService = require('../services/aiEvaluationService');
const fs = require('fs');
const path = require('path');

const INTERVIEW_FIELDS = [
  { id: 1, name: 'Software Development' },
  { id: 2, name: 'Data Science' },
  { id: 3, name: 'DevOps' },
  { id: 4, name: 'Machine Learning' },
  { id: 5, name: 'Cloud Architecture' }
];

exports.startSession = async (req, res) => {
  try {
    const { fieldId } = req.body;

    if (!fieldId) {
      return res.status(400).json({
        message: 'Field ID is required',
        status: 'error'
      });
    }

    const field = INTERVIEW_FIELDS.find(f => f.id === parseInt(fieldId));
    if (!field) {
      return res.status(404).json({
        message: 'Field not found',
        status: 'error'
      });
    }

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const session = new InterviewSession({
      sessionId,
      userId: req.userId,
      fieldId,
      fieldName: field.name
    });

    await session.save();

    res.status(201).json({
      message: 'Interview session started',
      sessionId,
      fieldId,
      fieldName: field.name,
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Failed to start session',
      status: 'error'
    });
  }
};

exports.getQuestions = (req, res) => {
  try {
    const { fieldId } = req.params;

    const questionsPath = path.join(__dirname, '../../public/questions/interview_questions.json');
    const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

    const fieldQuestions = questionsData.questions.filter(q => q.fieldId === parseInt(fieldId));

    if (fieldQuestions.length === 0) {
      return res.status(404).json({
        message: 'No questions found for this field',
        status: 'error'
      });
    }

    res.json({
      fieldId,
      questions: fieldQuestions,
      totalQuestions: fieldQuestions.length,
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Failed to fetch questions',
      status: 'error'
    });
  }
};

exports.submitAnswer = async (req, res) => {
  try {
    const { sessionId, questionId, answer, timeSpent } = req.body;

    const session = await InterviewSession.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({
        message: 'Session not found',
        status: 'error'
      });
    }

    session.answers.push({
      questionId,
      answer,
      timeSpent: timeSpent || 0,
      submittedAt: new Date()
    });

    await session.save();

    res.json({
      message: 'Answer submitted successfully',
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Failed to submit answer',
      status: 'error'
    });
  }
};

exports.endSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await InterviewSession.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({
        message: 'Session not found',
        status: 'error'
      });
    }

    session.status = 'completed';
    session.endTime = new Date();
    await session.save();

    // Evaluate answers using AI
    const evaluation = await aiEvaluationService.evaluateAnswers(
      session.answers,
      session.fieldId
    );

    // Create result
    const result = new Result({
      sessionId,
      userId: session.userId,
      fieldId: session.fieldId,
      totalQuestions: session.answers.length,
      correctAnswers: evaluation.correctAnswers,
      partialAnswers: evaluation.partialAnswers,
      marksObtained: evaluation.marksObtained,
      totalMarks: evaluation.totalMarks || 100,
      percentage: evaluation.percentage,
      feedback: evaluation.generalFeedback,
      evaluationDetails: evaluation.details
    });

    await result.save();

    res.json({
      message: 'Interview session ended',
      sessionId,
      resultId: result._id,
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Failed to end session',
      status: 'error'
    });
  }
};

exports.abandonSession = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await InterviewSession.findOne({ sessionId });
    if (session) {
      session.status = 'abandoned';
      session.endTime = new Date();
      await session.save();
    }
    res.json({ message: 'Session abandoned', status: 'success' });
  } catch (error) {
    res.status(500).json({ message: error.message, status: 'error' });
  }
};

exports.getSessionResults = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const result = await Result.findOne({ sessionId });
    if (!result) {
      return res.status(404).json({
        message: 'Results not found',
        status: 'error'
      });
    }

    res.json({
      ...result.toObject(),
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Failed to fetch results',
      status: 'error'
    });
  }
};
