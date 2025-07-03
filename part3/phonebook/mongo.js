const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Not enough arguments')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@cluster0.atz0moi.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url).then(() => {
  console.log('connected to atls');
  
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length == 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
else{
  person.save().then(() => {
    console.log('contact saved!')
    mongoose.connection.close()
  })
}