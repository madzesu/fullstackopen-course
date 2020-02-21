import React from 'react';
import Languages from './Languages';
import CountryFlag from './CountryFlag';
import WeatherReport from './WeatherReport';


const Country = props => {
    return (
        <div>
            <h2>{props.name}</h2>
            <div>capital {props.capital}</div>
            <div>population {props.population}</div>
            <h3>Languages</h3>
            <Languages languages={props.languages} />
            <CountryFlag src={props.flag} alt={`Flag of ${props.name}`} />
            <h3>Weather in {props.capital}</h3>
            {props.capitalWeather && <WeatherReport {...props.capitalWeather} />}
        </div>
    );
};

export default Country;
