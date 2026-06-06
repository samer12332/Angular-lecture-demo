const { body, param } = require('express-validator');

const { handleValidationErrors } = require('../middleware/validation.middleware');

const validateCreateStudent = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isNumeric()
    .withMessage('Age must be a number')
    .custom((value) => Number(value) > 0)
    .withMessage('Age must be greater than 0'),
  handleValidationErrors,
];

const validateUpdateStudent = [
  param('id')
    .isMongoId()
    .withMessage('Student id must be a valid MongoDB ObjectId'),
  body().custom((value) => {
    const allowedFields = ['name', 'age'];
    return allowedFields.some((field) => value[field] !== undefined);
  }).withMessage('At least one of name or age must be provided'),
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  body('age')
    .optional()
    .isNumeric()
    .withMessage('Age must be a number')
    .custom((value) => Number(value) > 0)
    .withMessage('Age must be greater than 0'),
  handleValidationErrors,
];

const validateStudentId = [
  param('id')
    .isMongoId()
    .withMessage('Student id must be a valid MongoDB ObjectId'),
  handleValidationErrors,
];

module.exports = {
  validateCreateStudent,
  validateStudentId,
  validateUpdateStudent,
};
