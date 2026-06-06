require('dotenv').config();

const app = require('./src/app');
const { connectToDatabase } = require('./src/config/db');

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/angular_lab_students';

async function startServer() {
  try {
    await connectToDatabase(MONGO_URI);
    console.log(`Connected to MongoDB at ${MONGO_URI}`);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

startServer();
