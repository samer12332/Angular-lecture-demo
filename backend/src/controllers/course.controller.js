const ApiError = require('../utils/apiError');
const Course = require('../models/course.model');

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

    const course = await Course.findById(id);
    if (!course) {
      return next(new ApiError('Course not found', 404));
    }

    res.json(course);
  } catch (error) {
    next(error);
  }
}

async function addCourse(req, res, next) {
  try {
    const { name, code, hours } = req.body;

    const newCourse = await Course.create({
      name,
      code,
      hours: Number(hours),
    });

    res.status(201).json(newCourse);
  } catch (error) {
    if (error && error.code === 11000 && error.keyPattern?.code) {
      return next(new ApiError('Course code already exists', 400));
    }

    next(error);
  }
}

async function updateCourse(req, res, next) {
  try {
    const { id } = req.params;
    const { name, code, hours } = req.body;
    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (code !== undefined) {
      updateData.code = code;
    }

    if (hours !== undefined) {
      updateData.hours = Number(hours);
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
        context: 'query',
      },
    );

    if (!updatedCourse) {
      return next(new ApiError('Course not found', 404));
    }

    res.json(updatedCourse);
  } catch (error) {
    if (error && error.code === 11000 && error.keyPattern?.code) {
      return next(new ApiError('Course code already exists', 400));
    }

    next(error);
  }
}

async function deleteCourse(req, res, next) {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return next(new ApiError('Course not found', 404));
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
