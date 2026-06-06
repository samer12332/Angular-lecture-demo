const mongoose = require('mongoose');

async function connectToDatabase(mongoUri) {
  await mongoose.connect(mongoUri);
}

module.exports = {
  connectToDatabase,
};
