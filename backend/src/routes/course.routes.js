const express = require('express');

const { validatePaginationQuery } = require('../validators/pagination.validator');
const {
  validateCourseId,
  validateCreateCourse,
  validateUpdateCourse,
} = require('../validators/course.validator');
const {
  addCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} = require('../controllers/course.controller');

const router = express.Router();

router.get('/', validatePaginationQuery, getAllCourses);
router.get('/:id', validateCourseId, getCourseById);
router.post('/', validateCreateCourse, addCourse);
router.put('/:id', validateUpdateCourse, updateCourse);
router.delete('/:id', validateCourseId, deleteCourse);

module.exports = router;
