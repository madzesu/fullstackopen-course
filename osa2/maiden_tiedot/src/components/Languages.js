import React from 'react';
import Language from './Language';


const Languages = props => {
    return (
        <ul>
            {props.languages.map(language => (
                <Language key={language.iso639_1} {...language} />
            ))}
        </ul>
    );
};

export default Languages;
