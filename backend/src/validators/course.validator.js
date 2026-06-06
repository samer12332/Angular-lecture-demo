const { body, param } = require('express-validator');

const { handleValidationErrors } = require('../middleware/validation.middleware');

const validateCreateCourse = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  body('code')
    .notEmpty()
    .withMessage('Code is required')
    .isString()
    .withMessage('Code must be a string')
    .trim()
    .toUpperCase(),
  body('hours')
    .notEmpty()
    .withMessage('Hours is required')
    .isNumeric()
    .withMessage('Hours must be a number')
    .custom((value) => Number(value) > 0)
    .withMessage('Hours must be greater than 0'),
  handleValidationErrors,
];

const validateUpdateCourse = [
  param('id')
    .isMongoId()
    .withMessage('Course id must be a valid MongoDB ObjectId'),
  body().custom((value) => {
    const allowedFields = ['name', 'code', 'hours'];
    return allowedFields.some((field) => value[field] !== undefined);
  }).withMessage('At least one of name, code or hours must be provided'),
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  body('code')
    .optional()
    .isString()
    .withMessage('Code must be a string')
    .trim()
    .toUpperCase(),
  body('hours')
    .optional()
    .isNumeric()
    .withMessage('Hours must be a number')
    .custom((value) => Number(value) > 0)
    .withMessage('Hours must be greater than 0'),
  handleValidationErrors,
];

const validateCourseId = [
  param('id')
    .isMongoId()
    .withMessage('Course id must be a valid MongoDB ObjectId'),
  handleValidationErrors,
];

module.exports = {
  validateCourseId,
  validateCreateCourse,
  validateUpdateCourse,
};
