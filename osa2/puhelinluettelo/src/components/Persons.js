import React from 'react';
import Person from './Person';


const Persons = props => {
    return (
        <div>
            {props.persons.map(person => (
                <Person
                    {...person}
                    key={person.id}
                    onDelete={() => props.onPersonRemoveClick(person)}
                />
            ))}
        </div>
    );
};

export default Persons;
