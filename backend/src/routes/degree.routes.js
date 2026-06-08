const express = require('express');

const { validatePaginationQuery } = require('../validators/pagination.validator');
const {
  addDegree,
  deleteDegree,
  getAllDegrees,
  getDegreeById,
  getDegreesByCourse,
  getDegreesByStudent,
  updateDegree,
} = require('../controllers/degree.controller');
const {
  validateCourseDegrees,
  validateCreateDegree,
  validateDegreeId,
  validateStudentDegrees,
  validateUpdateDegree,
} = require('../validators/degree.validator');

const router = express.Router();

router.get('/', validatePaginationQuery, getAllDegrees);
router.get('/student/:studentId', validateStudentDegrees, getDegreesByStudent);
router.get('/course/:courseId', validateCourseDegrees, getDegreesByCourse);
router.get('/:id', validateDegreeId, getDegreeById);
router.post('/', validateCreateDegree, addDegree);
router.put('/:id', validateUpdateDegree, updateDegree);
router.delete('/:id', validateDegreeId, deleteDegree);

module.exports = router;
