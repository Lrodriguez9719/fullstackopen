import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const nameAlreadyExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (nameAlreadyExists === undefined) {
      const personObject = {
        name: newName,
        number: phoneNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson])
          setNewName('')
          setPhoneNumber('')
        })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter !== '' 
  ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        phoneNumber={phoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App