import React, { useState, useEffect } from 'react';
import './App.css';

import Note from './components/Note';
import noteService from './services/notes';


const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [shouldShowAll, setShouldShowAll] = useState(true);

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes);
            });
    }, []);

    const onNewNoteChange = e => {
        setNewNote(e.target.value);
    };

    const addNote = note => {
        noteService
            .create(note)
            .then(addedNote => {
                setNotes(notes.concat(addedNote));
                setNewNote('');
            });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const note = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5
        };
        addNote(note);
    };

    const updateNote = (id, noteObject) => {
        noteService
            .update(id, noteObject)
            .then(updatedNote => {
                const updatedNotes = notes.map(note =>
                    note.id === id ? updatedNote : note
                );
                setNotes(updatedNotes);
            })
            .catch(error => {
                alert(`the note '${noteObject.content}' was already deleted from server`);
                setNotes(notes.filter(note => note.id !== id));
            });
    };

    const toggleNoteImportance = e => {
        const noteId = parseInt(e.target.value);
        const noteObject = notes.find(note => note.id === noteId);
        if (noteObject) {
            const changedNote = {
                ...noteObject,
                important: !noteObject.important
            };
            updateNote(noteId, changedNote);
        }
    };

    const notesToShow = shouldShowAll
        ? notes
        : notes.filter(note => note.important);

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShouldShowAll(!shouldShowAll)}>
                    show {shouldShowAll ? 'important' : 'all'}
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    value={newNote}
                    onChange={onNewNoteChange}
                />
                <button type="submit">
                    save
                </button>
            </form>
            <ul>
                {notesToShow.map(note => (
                    <Note
                        {...note}
                        key={note.id}
                        onNoteImportantClick={toggleNoteImportance}
                    />
                ))}
            </ul>
        </div >
    );
}

export default App;
