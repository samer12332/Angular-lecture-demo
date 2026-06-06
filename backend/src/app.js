const express = require('express');
const cors = require('cors');

const courseRoutes = require('./routes/course.routes');
const departmentRoutes = require('./routes/department.routes');
const studentRoutes = require('./routes/student.routes');
const { errorMiddleware } = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/courses', courseRoutes);
app.use('/departments', departmentRoutes);
app.use(studentRoutes);

app.use(errorMiddleware);

module.exports = app;
