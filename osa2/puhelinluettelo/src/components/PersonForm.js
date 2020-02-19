import React from 'react'


const PersonForm = props => {
    return (
        <form onSubmit={props.onSubmit}>
            {props.fields.map(field => (
                <div key={field.label}>
                    {field.label}: <input value={field.value} onChange={field.onChange} />
                </div>
            ))}
            <div>
                <button type="submit">
                    add
                </button>
            </div>
        </form>
    );
};

export default PersonForm;
