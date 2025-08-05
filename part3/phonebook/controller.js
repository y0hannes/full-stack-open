const Person = require("./model")

const generateId = () => {
  return Math.floor(Math.random() * 10000).toString()
}

const getContacts = async (req, res) => {
  try {
    const persons = await Person.find({})
    res.json(persons)
  } catch (err) {
    console.log(err)
    res.status(400).json({ err: 'Server error' })
  }
}

const getInfo = async (req, res) => {
  try {
    const totalDocuments = await Person.countDocuments({})
    const date = Date().toString()
    response.send(`Phonebook has info for ${totalDocuments} people.\n ${date}`)
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: 'Server error' })
  }
}


const getContact = async (req, res) => {
  try {
    const id = req.params.id
    const person = await Person.findOne({ id })
    if (!person) {
      return res.status(404).json({ err: 'Contact not found' })
    }
    res.status(200).json(person)

  } catch (err) {
    console.log(err)
    res.status(500).json({ err: 'Server error' })
  }
}

const deleteContact = async (req, res) => {
  try {
    const id = req.params.id
    const deletedPerson = await Person.findOneAndDelete({ id })
    if (!deletedPerson) {
      return res.status(404).json({ error: 'Contact not found' })
    }
    res.status(204).end()
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' })
  }
}

const createContact = async (req, res) => {
  try {
    const { name, number } = req.body
    if (!name || !number) {
      return res.status(400).json({ err: 'All fields should be filled' })
    }
    const id = generateId()
    const person = new Person({ id, name, number })
    await person.save()
    res.status(201).json(person)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = { getInfo, getContacts, getContact, deleteContact, createContact }
