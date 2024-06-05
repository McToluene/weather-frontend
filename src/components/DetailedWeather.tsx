import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { WeatherContext } from '../context/WeatherContext';

const DetailedWeather: React.FC = () => {
  const { detailedWeatherData } = useContext(WeatherContext)!;
  const navigate = useNavigate();

  if (!detailedWeatherData) {
    navigate('/');
    return null;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
      <div className=' p-4 flex flex-col justify-center items-center text-center'>
        <img
          className='w-36 h-36 mb-1'
          src={`http://openweathermap.org/img/w/${detailedWeatherData.weather[0].icon}.png`}
          alt={detailedWeatherData.weather[0].description}
        />
        <p>Temperature: {(detailedWeatherData.main.temp - 273.15).toFixed(1)}°C</p>
        <p>Feels Like: {(detailedWeatherData.main.feels_like - 273.15).toFixed(1)}°C</p>
        <p>Humidity: {detailedWeatherData.main.humidity}%</p>
        <p>Pressure: {(detailedWeatherData.main.pressure * 0.750061683).toFixed(2)} mmHg</p>
        <p>Wind Speed: {detailedWeatherData.wind.speed} m/s</p>
        <p>Description: {detailedWeatherData.weather[0].description}</p>
      </div>
    </div>
  );
};

export default DetailedWeather;
