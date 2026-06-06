const express = require('express');

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

router.get('/', getAllCourses);
router.get('/:id', validateCourseId, getCourseById);
router.post('/', validateCreateCourse, addCourse);
router.put('/:id', validateUpdateCourse, updateCourse);
router.delete('/:id', validateCourseId, deleteCourse);

module.exports = router;
