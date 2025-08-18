const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'production' ?
  process.env.MONGODB_URI : process.env.TEST_MONGODB_URI

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(MONGODB_URI)
    console.log('connected to DB')
  } catch (error) {
    console.error('error connecting to DB:', error.message)
    throw error
  }
}

module.exports = connectDB
