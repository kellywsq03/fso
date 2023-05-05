const Number = ({person}) => <p>{person.name} {person.number}</p>

const Persons = ({personsToShow}) => {
    return (
        <div>
            {personsToShow.map(person =>
                <Number key={person.name} person={person} />
            )}
        </div>
    )
}

export default Persons