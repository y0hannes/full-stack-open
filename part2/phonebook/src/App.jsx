import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Services from './components/Services'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    Services.GetAll()
      .then(person => setPersons(person))
  }, [])

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

    const existingPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with the new one?`
      )
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        Services.Update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map(person =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            )
          })
      }
      else {
        return
      }
    }
    else {
      const person = {
        name: newName,
        number: newNumber
      }
      Services.Create(person)
        .then(newPerson => {
          setPersons([...persons, newPerson])
          setNewName('')
          setNewNumber('')
        })
        .catch(error => { alert("error updating data") })
    }
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      Services.Delete(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`Failed to delete ${name}.`)
        })
    }
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
      <Persons persons={filteredPersons} handleDelete={handleDelete} />

    </div >
  )
}

export default App
