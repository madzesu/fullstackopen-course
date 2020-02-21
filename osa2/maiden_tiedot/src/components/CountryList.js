import React from 'react';


const CountryList = props => {
    return (
        <div>
            {props.countries.map(country => (
                <div key={country.alpha3Code}>
                    {country.name}
                    <button
                        value={country.name}
                        onClick={props.onCountryClick}
                    >
                        show
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CountryList;
