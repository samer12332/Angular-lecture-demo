const { body, param } = require('express-validator');

const { handleValidationErrors } = require('../middleware/validation.middleware');

const validateCreateDegree = [
  body('student')
    .notEmpty()
    .withMessage('Student is required')
    .isMongoId()
    .withMessage('Student id must be a valid MongoDB ObjectId'),
  body('course')
    .notEmpty()
    .withMessage('Course is required')
    .isMongoId()
    .withMessage('Course id must be a valid MongoDB ObjectId'),
  body('degree')
    .notEmpty()
    .withMessage('Degree is required')
    .isNumeric()
    .withMessage('Degree must be a number')
    .custom((value) => Number(value) >= 0 && Number(value) <= 100)
    .withMessage('Degree must be between 0 and 100'),
  handleValidationErrors,
];

const validateUpdateDegree = [
  param('id')
    .isMongoId()
    .withMessage('Degree id must be a valid MongoDB ObjectId'),
  body().custom((value) => {
    const allowedFields = ['student', 'course', 'degree'];
    return allowedFields.some((field) => value[field] !== undefined);
  }).withMessage('At least one of student, course or degree must be provided'),
  body('student')
    .optional()
    .isMongoId()
    .withMessage('Student id must be a valid MongoDB ObjectId'),
  body('course')
    .optional()
    .isMongoId()
    .withMessage('Course id must be a valid MongoDB ObjectId'),
  body('degree')
    .optional()
    .isNumeric()
    .withMessage('Degree must be a number')
    .custom((value) => Number(value) >= 0 && Number(value) <= 100)
    .withMessage('Degree must be between 0 and 100'),
  handleValidationErrors,
];

const validateDegreeId = [
  param('id')
    .isMongoId()
    .withMessage('Degree id must be a valid MongoDB ObjectId'),
  handleValidationErrors,
];

const validateStudentDegrees = [
  param('studentId')
    .isMongoId()
    .withMessage('Student id must be a valid MongoDB ObjectId'),
  handleValidationErrors,
];

const validateCourseDegrees = [
  param('courseId')
    .isMongoId()
    .withMessage('Course id must be a valid MongoDB ObjectId'),
  handleValidationErrors,
];

module.exports = {
  validateCourseDegrees,
  validateCreateDegree,
  validateDegreeId,
  validateStudentDegrees,
  validateUpdateDegree,
};
