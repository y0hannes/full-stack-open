const Person = require('./model')

const generateId = () => Math.floor(Math.random() * 1000 + 1).toString()

const getContacts = (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
    .catch(error => next(error))
}

const getInfo = (req, res, next) => {
  Person.countDocuments({})
    .then(count => {
      const date = new Date().toString()
      res.send(`Phonebook has info for ${count} people.<br/> ${date}`)
    })
    .catch(error => next(error))
}

const getContact = (req, res, next) => {
  const id = req.params.id
  Person.findOne({ id })
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
}

const deleteContact = (req, res, next) => {
  const id = req.params.id
  Person.findOneAndDelete({ id })
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
}

const createContact = (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }
  const id = generateId()
  const person = new Person({
    id,
    name,
    number
  })

  person.save()
    .then(savedPerson => {
      res.status(201).json(savedPerson)
    })
    .catch(error => next(error))
}

const updateContact = (req, res, next) => {
  const id = req.params.id
  const { number } = req.body

  Person.findOneAndUpdate(
    { id },
    { number },
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )

    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
}

module.exports = { getInfo, getContacts, getContact, deleteContact, createContact, updateContact }
