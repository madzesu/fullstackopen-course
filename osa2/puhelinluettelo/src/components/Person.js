import React from 'react';


const Person = props => {
    return (
        <div>
            {props.name} {props.number}
            <button
                onClick={props.onDelete}
                style={{ marginLeft: 4 }}
            >
                delete
            </button>
        </div>
    );
};


export default Person;