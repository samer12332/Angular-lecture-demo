const mongoose = require('mongoose');

const Student = require('../models/student.model');

function createError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validateStudentPayload(name, age) {
  if (!name || typeof name !== 'string' || !name.trim()) {
    return 'Name is required';
  }

  const parsedAge = Number(age);
  if (Number.isNaN(parsedAge) || parsedAge <= 0) {
    return 'Age must be a number greater than 0';
  }

  return null;
}

function validateStudentId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(400, 'Invalid student id');
  }
}

async function getAllStudents(_req, res, next) {
  try {
    const students = await Student.find().sort({ _id: -1 });
    res.json(students);
  } catch (error) {
    next(error);
  }
}

async function getStudentById(req, res, next) {
  try {
    const { id } = req.params;
    validateStudentId(id);

    const student = await Student.findById(id);
    if (!student) {
      throw createError(404, 'Student not found');
    }

    res.json(student);
  } catch (error) {
    next(error);
  }
}

async function addStudent(req, res, next) {
  try {
    const { name, age } = req.body;
    const validationMessage = validateStudentPayload(name, age);

    if (validationMessage) {
      throw createError(400, validationMessage);
    }

    const newStudent = await Student.create({
      name: name.trim(),
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

    validateStudentId(id);

    const validationMessage = validateStudentPayload(name, age);
    if (validationMessage) {
      throw createError(400, validationMessage);
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        age: Number(age),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedStudent) {
      throw createError(404, 'Student not found');
    }

    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
}

async function deleteStudent(req, res, next) {
  try {
    const { id } = req.params;
    validateStudentId(id);

    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      throw createError(404, 'Student not found');
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
