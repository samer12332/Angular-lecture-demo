const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Student = require('./models/student');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/angular-lab3';

app.use(cors());
app.use(express.json());

function validateStudentPayload(name, age) {
  if (!name || typeof name !== 'string' || !name.trim()) {
    return 'Name is required';
  }

  const parsedAge = Number(age);
  if (!Number.isInteger(parsedAge) || parsedAge <= 0) {
    return 'Age must be a positive number';
  }

  return null;
}

function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

app.get('/students', async (_req, res) => {
  const students = await Student.find().sort({ _id: -1 });
  res.json(students);
});

app.get('/students/:id', async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid student id',
    });
  }

  const student = await Student.findById(id);

  if (!student) {
    return res.status(404).json({
      message: 'Student not found',
    });
  }

  res.json(student);
});

app.post('/students', async (req, res) => {
  const { name, age } = req.body;
  const validationMessage = validateStudentPayload(name, age);

  if (validationMessage) {
    return res.status(400).json({
      message: validationMessage,
    });
  }

  const newStudent = await Student.create({
    name: name.trim(),
    age: Number(age),
  });

  res.status(201).json(newStudent);
});

app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid student id',
    });
  }

  const validationMessage = validateStudentPayload(name, age);
  if (validationMessage) {
    return res.status(400).json({
      message: validationMessage,
    });
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
    return res.status(404).json({
      message: 'Student not found',
    });
  }

  res.json(updatedStudent);
});

app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid student id',
    });
  }

  const deletedStudent = await Student.findByIdAndDelete(id);

  if (!deletedStudent) {
    return res.status(404).json({
      message: 'Student not found',
    });
  }

  res.json({
    message: 'Student deleted successfully',
    deletedStudent,
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    message: 'Internal server error',
  });
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

startServer();
