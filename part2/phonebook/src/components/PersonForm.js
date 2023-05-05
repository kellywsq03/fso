const NewInput = ({text, value, onChange}) => <div>{text}: <input value={value} onChange={onChange} /></div>

const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
    <form onSubmit={addPerson} >
        <NewInput text='name' value={newName} onChange={handleNameChange} />
        <NewInput text='number' value={newNumber} onChange={handleNumberChange} />
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
}

export default PersonForm