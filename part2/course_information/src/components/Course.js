const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map((part) => (
      <Part
        key={part.id}
        part={part} 
      />
    ))}   
  </>

const Course = ({ courses }) => 
  <>
    {courses.map((course) => (
      <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total sum={course.parts.reduce((accumulator, part) => accumulator + part.exercises, 0)} />
      </>
    ))}
  </>

export default Course;
