const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student is required'],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course is required'],
    },
    degree: {
      type: Number,
      required: [true, 'Degree is required'],
      min: [0, 'Degree must be between 0 and 100'],
      max: [100, 'Degree must be between 0 and 100'],
    },
  },
  {
    versionKey: false,
  },
);

degreeSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports =
  mongoose.models.Degree || mongoose.model('Degree', degreeSchema);
