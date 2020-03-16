import React, { useState, useEffect } from 'react';
import './App.css';

import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';

import personService from './services/persons';


const findPersonByName = (persons, newPerson) =>
    persons.find(person => (
        person.name.toLowerCase() === newPerson.name.toLowerCase()
    ));

const findPersonById = (persons, id) =>
    persons.find(person => person.id === id);

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    const fetchPersons = () => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons);
            })
            .catch(error => {
                console.error('Fetching all persons failed')
            });
    };

    useEffect(() => {
        fetchPersons();
    }, []);

    const handleFilterChange = e => {
        setFilterValue(e.target.value);
    };

    const resetForm = () => {
        setNewName('');
        setNewNumber('');
    };

    const handleAddErrorResponse = error => {
        const { errors } = error.response.data;
        const errorStrings = Object.keys(errors).map(key => `${key}: ${errors[key]}`);
        setMessage({
            text: (
                <div>
                    Error:
                    {errorStrings.map((string, i) => (
                        <div key={i}>{string}</div>
                    ))}
                </div>
            ),
            type: 'error'
        });
        timeoutMessageClear();
    };

    const addPerson = person => {
        personService
            .create(person)
            .then(newPerson => {
                setPersons(persons.concat(newPerson));
                resetForm();
                setMessage({
                    text: `Added ${newPerson.name}`,
                    type: 'success'
                });

                setTimeout(() => {
                    setMessage({ text: '', type: '' });
                }, 5000);
            })
            .catch(handleAddErrorResponse);
    };

    const timeoutMessageClear = (timeout = 5000) => {
        setTimeout(() => {
            setMessage({ text: '', type: '' });
        }, timeout);
    };

    const triggerErrorNotification = (person) => {
        setMessage({
            text: `Information of ${person.name} has already been removed from server`,
            type: 'error'
        });
        setPersons(persons.filter(p => p.id !== person.id));
        timeoutMessageClear();
    };

    const removePerson = id => {
        const person = findPersonById(persons, id);
        personService
            .remove(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id));
                setMessage({
                    text: `${person.name} has been removed succesfully`,
                    type: 'success'
                });
                timeoutMessageClear();
            })
            .catch(() => {
                triggerErrorNotification(person);
            });
    };

    const updatePerson = personForUpdate => {
        const { id } = personForUpdate;
        personService
            .update(id, personForUpdate)
            .then(updatedPerson => {
                const updatedPersons = persons.map(person =>
                    person.id === updatedPerson.id
                        ? updatedPerson
                        : person
                );
                setPersons(updatedPersons);
                resetForm();
            })
            .catch(() => {
                const person = findPersonById(persons, id);
                triggerErrorNotification(person);
            });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const person = {
            name: newName,
            number: newNumber
        };
        const existingPerson = findPersonByName(persons, person);
        if (existingPerson) {
            const confirmed = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`
            );
            if (confirmed) {
                const personForUpdate = {
                    ...existingPerson,
                    number: newNumber
                };
                updatePerson(personForUpdate);
            }
        } else {
            addPerson(person);
        }
    };

    const handleNewNameChange = e => {
        setNewName(e.target.value);
    };

    const handleNewNumberChange = e => {
        setNewNumber(e.target.value);
    };

    const onPersonRemoveClick = person => {
        const confirmed = window.confirm(`Delete ${person.name} ?`);
        if (confirmed) {
            removePerson(person.id);
        }
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
            <Notification
                message={message.text}
                type={message.type}
            />
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
            <Persons
                persons={shownPersons}
                onPersonRemoveClick={onPersonRemoveClick}
            />
        </div>
    );
}

export default App;
