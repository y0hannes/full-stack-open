require('dotenv').config()
const mongoose = require('mongoose')

const password = process.env.PASSWORD

const connectDB = () => {
  const url = `mongodb+srv://admin:${password}@cluster0.atz0moi.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`
  mongoose.set('strictQuery', false)
  mongoose.connect(url).then(() => {
    console.log('connected to atls')
  })
}

module.exports = connectDB