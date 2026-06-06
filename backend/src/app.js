const express = require('express');
const cors = require('cors');

const studentRoutes = require('./routes/student.routes');
const { errorMiddleware } = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use(studentRoutes);

app.use(errorMiddleware);

module.exports = app;
