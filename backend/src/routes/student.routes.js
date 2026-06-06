const express = require('express');

const {
  addStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} = require('../controllers/student.controller');

const router = express.Router();

router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.post('/students', addStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

module.exports = router;
