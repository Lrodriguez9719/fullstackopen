const Person = ({person}) => {
  return (
    <p key={person.name}>{person.name} {person.number}</p>
  )
}

const Persons = ({persons}) => {
  return (
    <>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </>
  )
}

export default Persons;