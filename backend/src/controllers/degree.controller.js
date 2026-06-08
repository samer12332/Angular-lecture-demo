const ApiError = require('../utils/apiError');
const Course = require('../models/course.model');
const Degree = require('../models/degree.model');
const Student = require('../models/student.model');
const {
  buildPaginationMeta,
  getPagination,
} = require('../utils/pagination');

function getDegreeDuplicateError(error) {
  if (error && error.code === 11000 && error.keyPattern?.student && error.keyPattern?.course) {
    return new ApiError(
      'Degree already exists for this student in this course',
      400,
    );
  }

  return null;
}

async function getAllDegrees(req, res, next) {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const totalItems = await Degree.countDocuments();
    const degrees = await Degree.find()
      .populate('student')
      .populate('course')
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      data: degrees,
      pagination: buildPaginationMeta({ page, limit, totalItems }),
    });
  } catch (error) {
    next(error);
  }
}

async function getDegreeById(req, res, next) {
  try {
    const { id } = req.params;

    const degree = await Degree.findById(id)
      .populate('student')
      .populate('course');

    if (!degree) {
      return next(new ApiError('Degree not found', 404));
    }

    res.json(degree);
  } catch (error) {
    next(error);
  }
}

async function addDegree(req, res, next) {
  try {
    const { student, course, degree } = req.body;

    const existingStudent = await Student.findById(student);
    if (!existingStudent) {
      return next(new ApiError('Student not found', 404));
    }

    const existingCourse = await Course.findById(course);
    if (!existingCourse) {
      return next(new ApiError('Course not found', 404));
    }

    const existingDegree = await Degree.findOne({ student, course });
    if (existingDegree) {
      return next(
        new ApiError(
          'Degree already exists for this student in this course',
          400,
        ),
      );
    }

    const newDegree = await Degree.create({
      student,
      course,
      degree: Number(degree),
    });

    const populatedDegree = await Degree.findById(newDegree._id)
      .populate('student')
      .populate('course');

    res.status(201).json(populatedDegree);
  } catch (error) {
    const duplicateError = getDegreeDuplicateError(error);

    if (duplicateError) {
      return next(duplicateError);
    }

    next(error);
  }
}

async function updateDegree(req, res, next) {
  try {
    const { id } = req.params;
    const { student, course, degree } = req.body;
    const updateData = {};

    const existingDegree = await Degree.findById(id);
    if (!existingDegree) {
      return next(new ApiError('Degree not found', 404));
    }

    if (student !== undefined) {
      const existingStudent = await Student.findById(student);
      if (!existingStudent) {
        return next(new ApiError('Student not found', 404));
      }

      updateData.student = student;
    }

    if (course !== undefined) {
      const existingCourse = await Course.findById(course);
      if (!existingCourse) {
        return next(new ApiError('Course not found', 404));
      }

      updateData.course = course;
    }

    if (degree !== undefined) {
      updateData.degree = Number(degree);
    }

    const updatedDegree = await Degree.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
      context: 'query',
    })
      .populate('student')
      .populate('course');

    res.json(updatedDegree);
  } catch (error) {
    const duplicateError = getDegreeDuplicateError(error);

    if (duplicateError) {
      return next(duplicateError);
    }

    next(error);
  }
}

async function deleteDegree(req, res, next) {
  try {
    const { id } = req.params;

    const deletedDegree = await Degree.findByIdAndDelete(id)
      .populate('student')
      .populate('course');

    if (!deletedDegree) {
      return next(new ApiError('Degree not found', 404));
    }

    res.json({
      message: 'Degree deleted successfully',
      deletedDegree,
    });
  } catch (error) {
    next(error);
  }
}

async function getDegreesByStudent(req, res, next) {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return next(new ApiError('Student not found', 404));
    }

    const degrees = await Degree.find({ student: studentId })
      .populate('student')
      .populate('course')
      .sort({ _id: -1 });

    res.json(degrees);
  } catch (error) {
    next(error);
  }
}

async function getDegreesByCourse(req, res, next) {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ApiError('Course not found', 404));
    }

    const degrees = await Degree.find({ course: courseId })
      .populate('student')
      .populate('course')
      .sort({ _id: -1 });

    res.json(degrees);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addDegree,
  deleteDegree,
  getAllDegrees,
  getDegreeById,
  getDegreesByCourse,
  getDegreesByStudent,
  updateDegree,
};
