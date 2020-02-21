import React from 'react';
import WindDetails from './WindDetails';
import Temperature from './Temperature';


const WeatherReport = props => {
    const imgSrc = props.weather
        ? `http://openweathermap.org/img/w/${props.weather[0].icon}.png`
        : '';

    return (
        <div>
            <Temperature {...props.main} />
            <img src={imgSrc} alt="" />
            <WindDetails {...props.wind} />
        </div>
    );
};

export default WeatherReport;
