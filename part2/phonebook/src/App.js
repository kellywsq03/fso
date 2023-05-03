import { useState } from 'react'

const Name = ({person}) => <p>{person.name}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    
    let isAdded = false

    persons.forEach(person => {
      if (person.name === newName) {
        isAdded = true
      }
    })

    if (!isAdded) {
      setPersons(persons.concat(personObject)) 
      setNewName("")
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        {persons.map(person =>
          <Name key={person.name} person={person} />
        )}
      </>
    </div>
  )
}

export default App