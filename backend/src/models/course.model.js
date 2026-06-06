const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    hours: {
      type: Number,
      required: [true, 'Hours is required'],
      min: [1, 'Hours must be greater than 0'],
    },
  },
  {
    versionKey: false,
  },
);

module.exports =
  mongoose.models.Course || mongoose.model('Course', courseSchema);
