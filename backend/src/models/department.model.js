const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports =
  mongoose.models.Department ||
  mongoose.model('Department', departmentSchema);
