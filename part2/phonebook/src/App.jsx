import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleName = (e) => {
    setNewName(e.target.value)
  }

  const handleNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    if (newName.length === 0) {
      alert('Name cannot be empty.')
      return
    }

    if (newNumber.length === 0) {
      alert('Number cannot be empty.')
      return
    }

    const alreadyExist = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (alreadyExist) {
      alert(`${newName} is already added to the phonebook.`)
      return
    }
    const person = {
      name: newName,
      number: newNumber
    }
    setPersons([...persons, person])
    setNewName('')
    setNewNumber('')
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }


  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <Filter
        value={searchQuery}
        onChange={handleSearch} />

      <h2>Phonebook</h2>

      <PersonForm
        onSubmit={addPerson}
        name={newName}
        nameChange={handleName}
        number={newNumber}
        numberChange={handleNumber}
        />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
      
    </div >
  )
}

export default App
