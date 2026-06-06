const ApiError = require('../utils/apiError');

function handleCastErrorDB(error) {
  return new ApiError(`Invalid ${error.path}: ${error.value}`, 400);
}

function handleValidationErrorDB(error) {
  const messages = Object.values(error.errors).map((value) => value.message);
  return new ApiError(messages.join(', '), 400);
}

function handleDuplicateFieldsDB(error) {
  const duplicateField = Object.keys(error.keyValue || {})[0];
  const duplicateValue = error.keyValue?.[duplicateField];

  if (duplicateField && duplicateValue !== undefined) {
    return new ApiError(
      `${duplicateField} "${duplicateValue}" already exists`,
      400,
    );
  }

  return new ApiError('Duplicate field value already exists', 400);
}

function errorMiddleware(error, _req, res, _next) {
  let err = error;

  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  if (err.name === 'CastError') {
    err = handleCastErrorDB(err);
  } else if (err.name === 'ValidationError') {
    err = handleValidationErrorDB(err);
  } else if (err.code === 11000) {
    err = handleDuplicateFieldsDB(err);
  }

  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  const response = {
    status,
    message: err.message || 'Internal server error',
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = errorMiddleware;
