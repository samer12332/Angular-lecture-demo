const { body, param } = require('express-validator');

const { handleValidationErrors } = require('../middleware/validation.middleware');

const validateCreateDepartment = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim(),
  handleValidationErrors,
];

const validateUpdateDepartment = [
  param('id')
    .isMongoId()
    .withMessage('Department id must be a valid MongoDB ObjectId'),
  body().custom((value) => {
    const allowedFields = ['name', 'description'];
    return allowedFields.some((field) => value[field] !== undefined);
  }).withMessage('At least one of name or description must be provided'),
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim(),
  handleValidationErrors,
];

const validateDepartmentId = [
  param('id')
    .isMongoId()
    .withMessage('Department id must be a valid MongoDB ObjectId'),
  handleValidationErrors,
];

const validateAssignCourseToDepartment = [
  param('departmentId')
    .isMongoId()
    .withMessage('Department id must be a valid MongoDB ObjectId'),
  param('courseId')
    .isMongoId()
    .withMessage('Course id must be a valid MongoDB ObjectId'),
  handleValidationErrors,
];

module.exports = {
  validateAssignCourseToDepartment,
  validateCreateDepartment,
  validateDepartmentId,
  validateUpdateDepartment,
};
