const mongoose = require('mongoose');

const Student = require('./models/student');
const sampleStudents = require('./data/students.json');

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/angular-lab3';

async function seedStudents() {
  try {
    await mongoose.connect(MONGODB_URI);

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

    console.log(`Seeded students into ${MONGODB_URI}`);
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
