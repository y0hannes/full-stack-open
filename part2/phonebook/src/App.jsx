import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Services from './components/Services'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [message, setMessage] = useState({})

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
      setMessage({
        value: 'Name cannot be empty.',
        error: true
      })
      setTimeout(() => setMessage({}), 5000)
      return
    }

    if (newNumber.length === 0) {
      setMessage({
        value: 'Number cannot be empty..',
        error: true
      })
      setTimeout(() => setMessage({}), 5000)
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
        setMessage({
          value: `${newName}'s number is successfully updated`,
          error: false
        })
        setTimeout(() => setMessage({}), 5000)
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
          setMessage({
              value: `${newName} is successfully added`,
              error: false
            })
          setTimeout(() => setMessage({}), 5000)
        })
        .catch(error => { alert("error updating data") })
    }
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      Services.Delete(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage({
            value: `${name} has been deleted`,
            error: TextTrackCueList
          })
          setTimeout(() => setMessage({}), 5000)
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
      <Notification message={message} />
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
