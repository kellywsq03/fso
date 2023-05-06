import { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  
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
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    // Check if name, number exists in array
    let isName = false
    let isNumber = false

    persons.forEach(person => {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        isName = true
      }
      if (person.number.toLowerCase() === newNumber.toLowerCase()) {
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

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        console.log(response.data)
      })
  }, [])

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
      
      <Persons persons={personsToShow}/>
    
    </div>
  )
}

export default App