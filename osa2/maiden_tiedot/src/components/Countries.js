import React from 'react';
import CountryList from './CountryList';
import Country from './Country';


const Countries = props => {
    const { countries } = props;

    const countryCount = countries.length;
    if (!countryCount) {
        return <div>No countries found, specify another filter</div>;
    }

    if (countryCount > 10) {
        return <div>Too many matches, specify another filter</div>;
    }

    if (countryCount <= 10 && countryCount > 1) {
        return (
            <CountryList
                countries={countries}
                onCountryClick={props.onCountryClick}
            />
        );
    }

    // Should return this when countries list contains only one country.
    return (
        <Country
            {...countries[0]}
            capitalWeather={props.capitalWeather}
        />
    );
};

export default Countries;
