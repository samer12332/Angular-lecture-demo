const express = require('express');

const { validatePaginationQuery } = require('../validators/pagination.validator');
const {
  validateCreateStudent,
  validateStudentId,
  validateUpdateStudent,
} = require('../validators/student.validator');
const {
  addStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} = require('../controllers/student.controller');

const router = express.Router();

router.get('/', validatePaginationQuery, getAllStudents);
router.get('/:id', validateStudentId, getStudentById);
router.post('/', validateCreateStudent, addStudent);
router.put('/:id', validateUpdateStudent, updateStudent);
router.delete('/:id', validateStudentId, deleteStudent);

module.exports = router;
