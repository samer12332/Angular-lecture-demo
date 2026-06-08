const express = require('express');

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

router.get('/', getAllDegrees);
router.get('/student/:studentId', validateStudentDegrees, getDegreesByStudent);
router.get('/course/:courseId', validateCourseDegrees, getDegreesByCourse);
router.get('/:id', validateDegreeId, getDegreeById);
router.post('/', validateCreateDegree, addDegree);
router.put('/:id', validateUpdateDegree, updateDegree);
router.delete('/:id', validateDegreeId, deleteDegree);

module.exports = router;
