const mongoose = require('mongoose');

const Course = require('../models/course.model');

function createError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validateCoursePayload(name, code, hours) {
  if (!name || typeof name !== 'string' || !name.trim()) {
    return 'Name is required';
  }

  if (!code || typeof code !== 'string' || !code.trim()) {
    return 'Code is required';
  }

  const parsedHours = Number(hours);
  if (Number.isNaN(parsedHours) || parsedHours <= 0) {
    return 'Hours must be a number greater than 0';
  }

  return null;
}

function validateCourseId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(400, 'Invalid course id');
  }
}

function handleDuplicateCodeError(error) {
  if (error && error.code === 11000 && error.keyPattern?.code) {
    throw createError(400, 'Course code already exists');
  }

  throw error;
}

async function getAllCourses(_req, res, next) {
  try {
    const courses = await Course.find().sort({ _id: -1 });
    res.json(courses);
  } catch (error) {
    next(error);
  }
}

async function getCourseById(req, res, next) {
  try {
    const { id } = req.params;
    validateCourseId(id);

    const course = await Course.findById(id);
    if (!course) {
      throw createError(404, 'Course not found');
    }

    res.json(course);
  } catch (error) {
    next(error);
  }
}

async function addCourse(req, res, next) {
  try {
    const { name, code, hours } = req.body;
    const validationMessage = validateCoursePayload(name, code, hours);

    if (validationMessage) {
      throw createError(400, validationMessage);
    }

    const newCourse = await Course.create({
      name: name.trim(),
      code: code.trim(),
      hours: Number(hours),
    });

    res.status(201).json(newCourse);
  } catch (error) {
    try {
      handleDuplicateCodeError(error);
    } catch (handledError) {
      next(handledError);
    }
  }
}

async function updateCourse(req, res, next) {
  try {
    const { id } = req.params;
    const { name, code, hours } = req.body;

    validateCourseId(id);

    const validationMessage = validateCoursePayload(name, code, hours);
    if (validationMessage) {
      throw createError(400, validationMessage);
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        code: code.trim(),
        hours: Number(hours),
      },
      {
        new: true,
        runValidators: true,
        context: 'query',
      },
    );

    if (!updatedCourse) {
      throw createError(404, 'Course not found');
    }

    res.json(updatedCourse);
  } catch (error) {
    try {
      handleDuplicateCodeError(error);
    } catch (handledError) {
      next(handledError);
    }
  }
}

async function deleteCourse(req, res, next) {
  try {
    const { id } = req.params;
    validateCourseId(id);

    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      throw createError(404, 'Course not found');
    }

    res.json({
      message: 'Course deleted successfully',
      deletedCourse,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
};
