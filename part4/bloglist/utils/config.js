require('dotenv').config()
const mongoose = require('mongoose')

const password = process.env.PASSWORD

const connectDB = () => {
  const uri = `mongodb+srv://admin:${password}@cluster0.atz0moi.mongodb.net/bloglist?retryWrites=true&w=majority&appName=Cluster0`
  mongoose.set('strictQuery', false)
  mongoose.connect(uri)
  .then(() => {
    console.log('connected to atls')
  })
  .catch(error => console.log(error))
}

module.exports = connectDB
