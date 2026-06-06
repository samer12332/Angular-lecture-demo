const express = require('express');

const {
  addDepartment,
  assignCourseToDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  removeCourseFromDepartment,
  updateDepartment,
} = require('../controllers/department.controller');

const router = express.Router();

router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);
router.post('/', addDepartment);
router.post('/:departmentId/courses/:courseId', assignCourseToDepartment);
router.put('/:id', updateDepartment);
router.delete('/:departmentId/courses/:courseId', removeCourseFromDepartment);
router.delete('/:id', deleteDepartment);

module.exports = router;
