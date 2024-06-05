import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { WeatherContext } from '../context/WeatherContext';
import { WeatherData, WeatherForecast } from '../types/type';

const WeatherCard: React.FC = () => {
  const {
    weatherForecast: weatherData,
    setDetailedWeatherData,
    setIsLoading,
    isLoading,
  } = useContext(WeatherContext)!;
  const navigate = useNavigate();

  const handleCardClick = async (data: WeatherForecast | null) => {
    if (data != null) {
      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/weather/current`, {
          params: {
            lat: data.city.coord.lat,
            lon: data.city.coord.lon,
          },
        });
        setDetailedWeatherData(response.data);
        setIsLoading(false);
        navigate(`/details?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}`);
      } catch (error) {
        console.error('Error fetching detailed weather data', error);
        setIsLoading(false);
      }
    }
  };

  const groupedWeatherData: { [key: string]: WeatherData } = {};
  weatherData?.list.forEach((curr) => {
    const date = new Date(curr.dt * 1000).toISOString().split('T')[0];
    if (!groupedWeatherData[date]) {
      groupedWeatherData[date] = curr;
    }
  });

  return (
    <div>
      {isLoading && (
        <div className='flex justify-center items-center h-20'>
          <svg
            className='animate-spin h-7 w-7 mr-3 text-blue-500'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0117.709 5.99L19.1 4.6A10 10 0 002.6 19.1l1.4-1.4z'
            ></path>
          </svg>
        </div>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
        {Object.values(groupedWeatherData).map((data: WeatherData) => (
          <div
            key={data.dt}
            role='button'
            tabIndex={0}
            className='p-4 flex flex-col justify-center items-center text-center transition-transform duration-300 transform hover:scale-105 hover:shadow-lg'
            onClick={() => handleCardClick(weatherData)}
          >
            <p className='text-2xl font-semibold'>
              {new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <img
              className='w-36 h-36 mb-1'
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt={data.weather[0].description}
            />
            <p className='text-4xl font-bold mb-2'>{(data.main.temp - 273.15).toFixed(1)}°C</p>
            <p className='mb-2 text-xl'>{data.weather[0].description}</p>
            <p className='text-lg'>P: {(data.main.pressure * 0.750061683).toFixed(2)} mmHg</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
