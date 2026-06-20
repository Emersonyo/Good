const mongoose = require('mongoose')

async function connectDB() {
  const uri = process.env.MONGO_URI
  if (!uri) {
    console.warn('MONGO_URI not provided; skipping MongoDB connection')
    return
  }

  await mongoose.connect(uri, {
    maxPoolSize: 10,
  })
  console.log('Connected to MongoDB')
}

module.exports = connectDB
