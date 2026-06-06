const { validationResult } = require('express-validator');

const ApiError = require('../utils/apiError');

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const firstErrorMessage = errors.array()[0].msg;
  return next(new ApiError(firstErrorMessage, 400));
}

module.exports = {
  handleValidationErrors,
};
