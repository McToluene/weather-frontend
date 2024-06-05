import React from 'react';
import { WeatherData } from '../types/type';

interface WeatherCardProps {
  weatherData: WeatherData[];
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
      {weatherData.map((data) => (
        <div
          key={data.dt}
          className='p-4 bg-gradient-to-b from-blue-200 to-blue-50 bg-blue-50 flex flex-col justify-center items-center text-center transition-transform duration-300 transform hover:scale-105 hover:shadow-lg'
        >
          <img
            className='w-36 h-36 mb-2'
            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            alt={data.weather[0].description}
          />
          <p className='text-3xl font-bold mb-2'>{(data.main.temp - 273.15).toFixed(1)}°C</p>{' '}
          <p className='mb-2'>{data.weather[0].description}</p>
          <p>Pressure: {(data.main.pressure * 0.750061683).toFixed(2)} mmHg</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherCard;
