require('dotenv').config();

const mongoose = require('mongoose');

const Student = require('./src/models/student.model');
const sampleStudents = require('./data/students.json');

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/angular_lab_students';

async function seedStudents() {
  try {
    await mongoose.connect(MONGO_URI);

    const operations = sampleStudents.map((student) => ({
      updateOne: {
        filter: {
          name: student.name,
        },
        update: {
          $set: {
            name: student.name,
            age: student.age,
          },
        },
        upsert: true,
      },
    }));

    const result = await Student.bulkWrite(operations);

    console.log(`Seeded students into ${MONGO_URI}`);
    console.log(
      `Inserted: ${result.upsertedCount}, Updated: ${result.modifiedCount}, Matched: ${result.matchedCount}`,
    );
  } catch (error) {
    console.error('Failed to seed students:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedStudents();
