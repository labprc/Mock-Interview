const Result = require('../models/Result');

exports.getResult = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const result = await Result.findOne({ sessionId });
    if (!result) {
      return res.status(404).json({
        message: 'Result not found',
        status: 'error'
      });
    }

    res.json({
      ...result.toObject(),
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Failed to fetch result',
      status: 'error'
    });
  }
};

exports.getUserResults = async (req, res) => {
  try {
    const results = await Result.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json({
      results,
      totalAttempts: results.length,
      averagePercentage: results.length > 0 
        ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length)
        : 0,
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Failed to fetch results',
      status: 'error'
    });
  }
};
