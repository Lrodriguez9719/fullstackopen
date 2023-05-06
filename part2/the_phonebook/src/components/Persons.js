const Person = ({person, deletePerson}) => {
  return (
    <p key={person.name}>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person)}>
        delete
      </button>
    </p>
  )
}

const Persons = ({persons, deletePerson}) => {
  return (
    <>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          deletePerson={deletePerson}
        />
      ))}
    </>
  )
}

export default Persons;