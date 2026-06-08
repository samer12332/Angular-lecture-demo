const express = require('express');
const cors = require('cors');

const ApiError = require('./utils/apiError');
const courseRoutes = require('./routes/course.routes');
const degreeRoutes = require('./routes/degree.routes');
const departmentRoutes = require('./routes/department.routes');
const studentRoutes = require('./routes/student.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/courses', courseRoutes);
app.use('/degrees', degreeRoutes);
app.use('/departments', departmentRoutes);
app.use('/students', studentRoutes);

app.all('/{*any}', (req, _res, next) => {
  next(new ApiError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorMiddleware);

module.exports = app;
