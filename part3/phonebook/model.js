const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person