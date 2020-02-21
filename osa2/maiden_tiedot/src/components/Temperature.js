import React from 'react'


const kelvinToCelsius = kelvinValue => (kelvinValue - 273.15);

const Temperature = props => {
    const celsiusTemperature = kelvinToCelsius(props.temp).toFixed(1);
    return (
        <div>
            <strong>temperature: </strong>{celsiusTemperature}°C
        </div>
    );
};

export default Temperature;
