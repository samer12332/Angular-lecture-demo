const { query } = require('express-validator');

const { handleValidationErrors } = require('../middleware/validation.middleware');

const validatePaginationQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Limit must be a positive integer'),
  handleValidationErrors,
];

module.exports = {
  validatePaginationQuery,
};
