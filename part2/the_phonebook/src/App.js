import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0412-6187372' }
  ]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')

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
      setPersons([...persons, personObject])
      setNewName('')
      setPhoneNumber('')
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
      <div>
        filter shown with<input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={phoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        {personsToShow.map((person) => (
          <>
            <p key={person.name}>{person.name} {person.number}</p>
          </>
        ))}
      </>
    </div>
  )
}

export default App