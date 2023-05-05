import { useState } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }  

  const personsToShow = newFilter
    ? persons.filter(person => person.name.toLowerCase() === newFilter.toLowerCase())
    : persons

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    let isName = false
    let isNumber = false

    persons.forEach(person => {
      if (person.name === newName) {
        isName = true
      }
      if (person.number === newNumber) {
        isNumber = true
      }
    })

    if (isName) {
      alert(`${newName} is already added to phonebook`)
    }
    else if (isNumber) {
      alert(`${newNumber} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObject)) 
      setNewName("")
      setNewNumber("")
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      
      <h3>add a new</h3>
      
      <PersonForm 
      addPerson={addPerson} 
      newName={newName} 
      newNumber={newNumber} 
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} />
      
      <h3>Numbers</h3>
      
      <Persons personsToShow={personsToShow}/>
    
    </div>
  )
}

export default App