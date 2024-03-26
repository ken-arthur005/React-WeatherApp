import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

import search_icon from './Assets/search.png';
import clear_icon from './Assets/clear.png';
import drizzle_icon from './Assets/drizzle.png';
import cloud_icon from './Assets/cloud.png';
import humidity_icon from './Assets/humidity.png';
import rain from './Assets/rain.png';
import snow_icon from './Assets/snow.png';
import wind_icon from './Assets/wind.png';


const Weather = () => {
    let api_key = "708f500f76650fdf81fbeff99559bd2a";
    const [city, setCity] = useState ("");
    const [weatherData, setWeatherData] = useState (null);
    
    const fetchData = async () => { 
    try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
        );

        setWeatherData(response.data);
        console.log(response.data); 
      } catch (error) {
        console.error(error);
      }
    }; 

    useEffect (() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
      };

    return (
        <div className="container">
                <div className="header"> Carey's Weather App</div>
                <form className="top-bar" onSubmit={handleSubmit}>
                <input type="text" className="cityInput" placeholder="search" onChange={handleInputChange} value={city}/>
                
                <button className="search-icon" type="submit"><img src={search_icon} alt="search"/></button>
                
                </form>
                {weatherData? ( <>
                <div className="weather-image">
                    <img src={cloud_icon} alt=""/>
                </div>
                
                <div className="weather-temp">{weatherData.main.temp} </div>
                <div className="weather-location">{weatherData.name}</div>
                <div className="data-container">
                    <div className="element">
                        <img src={humidity_icon} alt="" className="icon"/>
                        <div className="data">
                            <div className="humidity-percent">{weatherData.main.humidity}%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={wind_icon} alt="" className="icon"/>
                        <div className="data">
                            <div className="humidity-percent">{weatherData.wind.speed}m/s</div>
                            <div className="text">Wind Spped</div>
                        </div>
                    </div>
                </div>
                </>
            ): (
                <p className="prompt">Kindly input your City's name and wait while we load the weather information</p>
            ) };

        </div>
    )


}
export default Weather