const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const authMiddleware = require('../middleware/auth');

router.post('/start', authMiddleware, interviewController.startSession);
router.get('/questions/:fieldId', interviewController.getQuestions);
router.post('/answer', authMiddleware, interviewController.submitAnswer);
router.post('/end', authMiddleware, interviewController.endSession);
router.post('/abandon', authMiddleware, interviewController.abandonSession);
router.get('/results/:sessionId', authMiddleware, interviewController.getSessionResults);

module.exports = router;
