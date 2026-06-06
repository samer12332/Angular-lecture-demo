const mongoose = require('mongoose');

const Course = require('../models/course.model');
const Department = require('../models/department.model');

function createError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validateDepartmentPayload(name) {
  if (!name || typeof name !== 'string' || !name.trim()) {
    return 'Name is required';
  }

  return null;
}

function validateDepartmentId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(400, 'Invalid department id');
  }
}

function validateCourseId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(400, 'Invalid course id');
  }
}

async function getPopulatedDepartmentById(id) {
  return Department.findById(id).populate('courses');
}

async function getAllDepartments(_req, res, next) {
  try {
    const departments = await Department.find()
      .populate('courses')
      .sort({ _id: -1 });
    res.json(departments);
  } catch (error) {
    next(error);
  }
}

async function getDepartmentById(req, res, next) {
  try {
    const { id } = req.params;
    validateDepartmentId(id);

    const department = await getPopulatedDepartmentById(id);
    if (!department) {
      throw createError(404, 'Department not found');
    }

    res.json(department);
  } catch (error) {
    next(error);
  }
}

async function addDepartment(req, res, next) {
  try {
    const { name, description } = req.body;
    const validationMessage = validateDepartmentPayload(name);

    if (validationMessage) {
      throw createError(400, validationMessage);
    }

    const newDepartment = await Department.create({
      name: name.trim(),
      description: typeof description === 'string' ? description.trim() : description,
    });

    res.status(201).json(newDepartment);
  } catch (error) {
    next(error);
  }
}

async function updateDepartment(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    validateDepartmentId(id);

    const validationMessage = validateDepartmentPayload(name);
    if (validationMessage) {
      throw createError(400, validationMessage);
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        description: typeof description === 'string' ? description.trim() : description,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedDepartment) {
      throw createError(404, 'Department not found');
    }

    res.json(updatedDepartment);
  } catch (error) {
    next(error);
  }
}

async function deleteDepartment(req, res, next) {
  try {
    const { id } = req.params;
    validateDepartmentId(id);

    const deletedDepartment = await Department.findByIdAndDelete(id);
    if (!deletedDepartment) {
      throw createError(404, 'Department not found');
    }

    res.json({
      message: 'Department deleted successfully',
      deletedDepartment,
    });
  } catch (error) {
    next(error);
  }
}

async function assignCourseToDepartment(req, res, next) {
  try {
    const { departmentId, courseId } = req.params;

    validateDepartmentId(departmentId);
    validateCourseId(courseId);

    const department = await Department.findById(departmentId);
    if (!department) {
      throw createError(404, 'Department not found');
    }

    const course = await Course.findById(courseId);
    if (!course) {
      throw createError(404, 'Course not found');
    }

    const isAssigned = department.courses.some(
      (assignedCourseId) => assignedCourseId.toString() === courseId,
    );

    if (isAssigned) {
      throw createError(400, 'Course is already assigned to this department');
    }

    department.courses.push(courseId);
    await department.save();

    const updatedDepartment = await getPopulatedDepartmentById(departmentId);
    res.json(updatedDepartment);
  } catch (error) {
    next(error);
  }
}

async function removeCourseFromDepartment(req, res, next) {
  try {
    const { departmentId, courseId } = req.params;

    validateDepartmentId(departmentId);
    validateCourseId(courseId);

    const department = await Department.findById(departmentId);
    if (!department) {
      throw createError(404, 'Department not found');
    }

    const course = await Course.findById(courseId);
    if (!course) {
      throw createError(404, 'Course not found');
    }

    department.courses = department.courses.filter(
      (assignedCourseId) => assignedCourseId.toString() !== courseId,
    );
    await department.save();

    const updatedDepartment = await getPopulatedDepartmentById(departmentId);
    res.json(updatedDepartment);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addDepartment,
  assignCourseToDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  removeCourseFromDepartment,
  updateDepartment,
};
