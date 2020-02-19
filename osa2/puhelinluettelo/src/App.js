import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';


const personExists = (persons, newPerson) => {
    const personIndex = persons.findIndex(person => (
        person.name.toLowerCase() === newPerson.name.toLowerCase()
    ));
    return personIndex !== -1;
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data);
            });
    }, []);

    const handleFilterChange = e => {
        setFilterValue(e.target.value);
    };

    const addPersonToPhonebook = person => {
        const personsCopy = [...persons];
        personsCopy.push(person);
        setPersons(personsCopy);
        setNewName('');
        setNewNumber('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        const person = {
            name: newName,
            number: newNumber
        };
        if (personExists(persons, person)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            addPersonToPhonebook(person);
        }
    };

    const handleNewNameChange = e => {
        setNewName(e.target.value);
    };

    const handleNewNumberChange = e => {
        setNewNumber(e.target.value);
    };

    const formFields = [
        {
            label: 'name',
            onChange: handleNewNameChange,
            value: newName
        },
        {
            label: 'number',
            onChange: handleNewNumberChange,
            value: newNumber
        }
    ];

    const shownPersons = filterValue
        ? persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
        : persons;

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                value={filterValue}
                onChange={handleFilterChange}
            />
            <h3>Add a new</h3>
            <PersonForm
                onSubmit={handleSubmit}
                fields={formFields}
            />
            <h2>Numbers</h2>
            <Persons persons={shownPersons} />
        </div>
    );
}

export default App;
