import React from 'react'

const Note = props => {
    const label = props.important
        ? 'make not important'
        : 'make important';

    return (
        <li>
            {props.content}
            <button
                value={props.id}
                onClick={props.onNoteImportantClick}
            >
                {label}
            </button>
        </li>
    );
};

export default Note;
