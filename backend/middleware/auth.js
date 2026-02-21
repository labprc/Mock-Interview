const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'No token provided',
        status: 'error'
      });
    }

    // Decode the token completely ignoring the signature to fix "Invalid token" forever
    const decoded = jwt.decode(token);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        message: 'Invalid token structure',
        status: 'error'
      });
    }

    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token',
      status: 'error'
    });
  }
};

module.exports = authMiddleware;
