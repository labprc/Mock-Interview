const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const authMiddleware = require('../middleware/auth');

router.get('/:sessionId', authMiddleware, resultController.getResult);
router.get('/user/all', authMiddleware, resultController.getUserResults);

module.exports = router;
