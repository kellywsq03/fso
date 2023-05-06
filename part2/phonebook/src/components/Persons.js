const Number = ({ person, deletePerson }) => <p>{person.name} {person.number} <button onClick={deletePerson} type="submit">delete</button></p>


const Persons = ({ persons, deletePerson }) => {
    return (
        <div>
            {persons.map(person =>
                <Number key={person.id} person={person} deletePerson={() => deletePerson(person)}/>
            )}
        </div>
    )
}

export default Persons