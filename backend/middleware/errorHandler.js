const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      errors: Object.keys(err.errors).map(key => ({
        field: key,
        message: err.errors[key].message
      })),
      status: 'error'
    });
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      message: `${field} already exists`,
      status: 'error'
    });
  }

  return res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    status: 'error'
  });
};

module.exports = errorHandler;
