const Number = ({person}) => <p>{person.name} {person.number}</p>

const Persons = ({persons}) => {
    return (
        <div>
            {persons.map(person =>
                <Number key={person.name} person={person} />
            )}
        </div>
    )
}

export default Persons