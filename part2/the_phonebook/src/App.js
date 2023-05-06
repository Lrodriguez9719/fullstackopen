import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import SuccessNotification from './components/SuccessNotification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson === undefined) {
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
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {
          ...existingPerson,
          number: phoneNumber
        }

        personService
          .replaceNumber(existingPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(
              persons.map((person) => person.id !== existingPerson.id ? person : returnedPerson)
            )
            setNewName('')
            setPhoneNumber('')
            setSuccessMessage(`Updated ${returnedPerson.name} number`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
      }
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(
          response => setPersons(persons.filter(p => p.id !== person.id))
        )
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
      <SuccessNotification message={successMessage} />
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
      <Persons
        persons={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App