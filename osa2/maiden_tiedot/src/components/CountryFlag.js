import React from 'react';


const CountryFlag = props => {
    return (
        <div>
            <img src={props.src} alt={props.alt} height={100} />
        </div>
    );
};

export default CountryFlag;
