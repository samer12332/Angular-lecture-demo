const ApiError = require('../utils/apiError');
const Course = require('../models/course.model');
const Department = require('../models/department.model');

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

    const department = await getPopulatedDepartmentById(id);
    if (!department) {
      return next(new ApiError('Department not found', 404));
    }

    res.json(department);
  } catch (error) {
    next(error);
  }
}

async function addDepartment(req, res, next) {
  try {
    const { name, description } = req.body;

    const newDepartment = await Department.create({
      name,
      description,
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
    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedDepartment) {
      return next(new ApiError('Department not found', 404));
    }

    res.json(updatedDepartment);
  } catch (error) {
    next(error);
  }
}

async function deleteDepartment(req, res, next) {
  try {
    const { id } = req.params;

    const deletedDepartment = await Department.findByIdAndDelete(id);
    if (!deletedDepartment) {
      return next(new ApiError('Department not found', 404));
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

    const department = await Department.findById(departmentId);
    if (!department) {
      return next(new ApiError('Department not found', 404));
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ApiError('Course not found', 404));
    }

    const isAssigned = department.courses.some(
      (assignedCourseId) => assignedCourseId.toString() === courseId,
    );

    if (isAssigned) {
      return next(
        new ApiError('Course is already assigned to this department', 400),
      );
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

    const department = await Department.findById(departmentId);
    if (!department) {
      return next(new ApiError('Department not found', 404));
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ApiError('Course not found', 404));
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
