function errorMiddleware(error, _req, res, _next) {
  console.error(error);

  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({
      message: error.message,
    });
  }

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : 'Internal server error';

  res.status(statusCode).json({
    message,
  });
}

module.exports = {
  errorMiddleware,
};
