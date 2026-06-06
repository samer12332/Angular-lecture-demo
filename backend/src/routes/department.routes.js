const express = require('express');

const {
  validateAssignCourseToDepartment,
  validateCreateDepartment,
  validateDepartmentId,
  validateUpdateDepartment,
} = require('../validators/department.validator');
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
router.get('/:id', validateDepartmentId, getDepartmentById);
router.post('/', validateCreateDepartment, addDepartment);
router.post(
  '/:departmentId/courses/:courseId',
  validateAssignCourseToDepartment,
  assignCourseToDepartment,
);
router.put('/:id', validateUpdateDepartment, updateDepartment);
router.delete(
  '/:departmentId/courses/:courseId',
  validateAssignCourseToDepartment,
  removeCourseFromDepartment,
);
router.delete('/:id', validateDepartmentId, deleteDepartment);

module.exports = router;
