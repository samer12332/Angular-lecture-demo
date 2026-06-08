const ApiError = require('../utils/apiError');
const Student = require('../models/student.model');
const {
  buildPaginationMeta,
  getPagination,
} = require('../utils/pagination');

async function getAllStudents(req, res, next) {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const totalItems = await Student.countDocuments();
    const students = await Student.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      data: students,
      pagination: buildPaginationMeta({ page, limit, totalItems }),
    });
  } catch (error) {
    next(error);
  }
}

async function getStudentById(req, res, next) {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return next(new ApiError('Student not found', 404));
    }

    res.json(student);
  } catch (error) {
    next(error);
  }
}

async function addStudent(req, res, next) {
  try {
    const { name, age } = req.body;

    const newStudent = await Student.create({
      name,
      age: Number(age),
    });

    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
}

async function updateStudent(req, res, next) {
  try {
    const { id } = req.params;
    const { name, age } = req.body;
    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (age !== undefined) {
      updateData.age = Number(age);
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedStudent) {
      return next(new ApiError('Student not found', 404));
    }

    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
}

async function deleteStudent(req, res, next) {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return next(new ApiError('Student not found', 404));
    }

    res.json({
      message: 'Student deleted successfully',
      deletedStudent,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
};
