let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :body'));
app.use(express.static('dist'))

const generateId = () => {
  return Math.floor(Math.random() * 10000).toString()
}

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
  const total = persons.length
  const date = Date().toString()
  response.send(`Phonebook has info for ${total} people.\n ${date}`)
})

app.get('/api/person/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id == id)

  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/person/:id', (request, response) => {
  const id = request.params.id
  const toBeDeleted = persons.find(person => person.id == id)
  if (toBeDeleted) {
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  }
  else {
    response.status(404).json({ error: 'Person not found' })
  }
})

app.post('/api/persons', (request, response) => {
  const id = String(generateId())
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: "name and number are required" })
  }
  const nameExist = persons.find(person => person.name === name)
  if (nameExist){
    return response.status(400).json({error:`${name} already exist`})
  }

  const person = { id, name, number }
  persons.push(person)
  response.status(201).json(person)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT)
console.log(`Server running on port ${PORT}`)