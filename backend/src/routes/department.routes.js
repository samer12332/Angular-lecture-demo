const express = require('express');

const {
  addDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
} = require('../controllers/department.controller');

const router = express.Router();

router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);
router.post('/', addDepartment);
router.put('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);

module.exports = router;
