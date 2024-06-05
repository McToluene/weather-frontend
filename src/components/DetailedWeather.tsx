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
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Detailed Weather</h2>
      <div className=' p-4 flex flex-col justify-center items-center text-center'>
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
