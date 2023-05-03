const Header = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </>
  )
}

const Part = ({ part }) =>
  <p>
      {part.name} {part.exercises}
  </p>

const Sum = ({ parts }) => {
    return (
        <b>
            Total of {parts.reduce(
                (sum, part) => (sum + part.exercises), 0
            )} exercises
        </b>
    )
}

const Course = ({course}) => {
  return (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Sum parts={course.parts} />
    </div>
  )
}

export default Course