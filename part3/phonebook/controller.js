const Person = require("./model")

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
  Person.findById(req.params.id)
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
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
}

const createContact = (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      res.status(201).json(savedPerson)
    })
    .catch(error => next(error))
}

const updateContact = (req, res, next) => {
  const { number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
}

module.exports = { getInfo, getContacts, getContact, deleteContact, createContact, updateContact }
