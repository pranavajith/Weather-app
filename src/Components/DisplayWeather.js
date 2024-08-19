import React, { useState, useEffect } from 'react';


const DisplayWeather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('India');
    const [error, setError] = useState(null);
    const key = 'ec3b35cb2bb64d5eb4793940241908';
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`;
    
    const fetchWeather = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                setError("The response from the API call failed.");
            }
            else {
                const data = await response.json();
                setWeatherData(data);
                setError(null);
            }
        }
        catch (e){
            setError("The recieved error is : " + e);
        }
    };

    // useEffect(() => {
    //     fetchWeather();
    // }, [location]);
    console.log(weatherData)
    return (
        <div>
            <h1>Weather App</h1>
            <input 
            type = 'text' 
            value = {location} 
            onChange={(e) => setLocation(e.target.value)} 
            />
            <button 
            onClick={fetchWeather}
            >
                Get Weather
            </button>

            {error && (
                <p>Error fetching data : {error}</p>
            )}
            {weatherData && (
                <div>
                    <p>Summary : {weatherData.current.condition.text}</p>
                    <p>Temperature : {weatherData.current.temp_c} C</p>
                    <p>Cloudy : {weatherData.current.cloud}%</p>
                    <p>Humidity : {weatherData.current.humidity}%</p>
                </div>
            )}
        </div>
    )
}

export default DisplayWeather;