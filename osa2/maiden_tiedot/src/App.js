import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Filter from './components/Filter';
import Countries from './components/Countries';


const useCountriesFetch = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data);
            });
    }, []);

    return countries;
};

const useCapitalWeatherFetch = capitalName => {
    const [capitalWeather, setCapitalWeather] = useState();

    useEffect(() => {
        if (capitalName) {
            const { REACT_APP_WEATHER_API_KEY: API_KEY } = process.env;
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}&q=${capitalName}`)
                .then(response => {
                    setCapitalWeather(response.data);
                });
        }
    }, [capitalName]);

    return capitalWeather;
};

const toLower = s => s.toLowerCase();

const App = () => {
    const [filterValue, setFilterValue] = useState('');
    const [capitalName, setCapitalName] = useState('');
    const countries = useCountriesFetch();
    const capitalWeather = useCapitalWeatherFetch(capitalName);

    const handleFilterChange = e => setFilterValue(e.target.value);

    const onCountryClick = e => setFilterValue(e.target.value);

    const handleCapitalNameChange = filteredCountries => {
        const newCapitalName = (filteredCountries.length === 1)
            ? filteredCountries[0].name
            : capitalName;
        if (newCapitalName !== capitalName) {
            setCapitalName(newCapitalName);
        }
    };

    const getFilteredCountries = (countries, filterValue) => {
        const filteredCountries = countries.filter(country =>
            toLower(country.name).includes(toLower(filterValue))
        );
        handleCapitalNameChange(filteredCountries);
        return filteredCountries;
    };

    const filteredCountries = filterValue
        ? getFilteredCountries(countries, filterValue)
        : countries;

    return (
        <div>
            <Filter
                value={filterValue}
                onChange={handleFilterChange}
            />
            <Countries
                countries={filteredCountries}
                capitalWeather={capitalWeather}
                onCountryClick={onCountryClick}
            />
        </div>
    );
}

export default App;
