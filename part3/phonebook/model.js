const mongoose = require('mongoose')

const phoneRegex = /^\d{2,3}-\d+$/

const personSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long']
  },
  number: {
    type: String,
    required: [true, 'Phone number is required'],
    minlength: [8, 'Phone number must be at least 8 characters long'],
    validate: {
      validator: function (value) {
        return phoneRegex.test(value)
      },
      message: props => `${props.value} is not a valid phone number format (e.g. 09-1234567)`
    }
  }
})


const Person = mongoose.model('Person', personSchema)

module.exports = Person