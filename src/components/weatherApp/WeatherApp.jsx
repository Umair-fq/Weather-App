// Importing icons
import React, { useState } from 'react';
import './weatherApp.css';
import clearWeatherIcon from '../assets/clear.png';
import cloudyWeatherIcon from '../assets/cloud.png';
import humidWeatherIcon from '../assets/humidity.png';
import searchIcon from '../assets/search.png';
import windyWeatherIcon from '../assets/wind.png';
import drizzleWeatherIcon from '../assets/drizzle.png';
import rainWeatherIcon from '../assets/rain.png';
import snowWeatherIcon from '../assets/snow.png';

const WeatherApp = () => {
  let apiKey = '73a266ac7891452dc4191f16407eee75';

  // Weather conditions mapping to icons
  const weatherIconMapping = {
    '01d': clearWeatherIcon,
    '01n': clearWeatherIcon,
    '02d': cloudyWeatherIcon,
    '02n': cloudyWeatherIcon,
    '03d': drizzleWeatherIcon,
    '03n': drizzleWeatherIcon,
    '04d': drizzleWeatherIcon,
    '04n': drizzleWeatherIcon,
    '09d': rainWeatherIcon,
    '09n': rainWeatherIcon,
    '10d': rainWeatherIcon,
    '10n': rainWeatherIcon,
    '13d': snowWeatherIcon,
    '13n': snowWeatherIcon,
  };

  // State for saving weather information and icon
  const [weatherData, setWeatherData] = useState({
    temp: '',
    location: '',
    humidity: '',
    windSpeed: '',
  });

  // State for saving the current weather icon
  const [weatherIcon, setWeatherIcon] = useState(cloudyWeatherIcon);

  const handleSearch = async () => {
    const searchValue = document.getElementsByClassName('weather-city-input')[0];
    if (!searchValue.value) {
      return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue.value}&units=Metric&appid=${apiKey}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setWeatherData({
        temp: Math.floor(data.main.temp),
        location: data.name,
        humidity: Math.floor(data.main.humidity) + '%',
        windSpeed: typeof data.wind.speed === 'number' ? data.wind.speed + ' km/h' : '',
      });

      // Set weather icon based on condition
      const conditionIcon = data.weather[0].icon;
      setWeatherIcon(weatherIconMapping[conditionIcon] || cloudyWeatherIcon);
    } else {
      console.error('Error fetching weather data');
    }
  };

  return (
    <div className='weather-container'>
      <div className="weather-top-bar">
        <input type="text" className='weather-city-input' placeholder='Search' />
        <div className="weather-search-icon">
          <img src={searchIcon} onClick={handleSearch} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherIcon} alt="" />
      </div>
      <div className="weather-temp">{weatherData.temp}&deg;C</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidWeatherIcon} alt="" className='icon' />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity </div>
          </div>
        </div>
        <div className="element">
          <img src={windyWeatherIcon} alt="" className='icon' />
          <div className="data">
            <div className="weather-wind">{weatherData.windSpeed}</div>
            <div className="wind-speed">Wind Speed </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
