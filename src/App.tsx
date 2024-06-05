import axios from 'axios';
import Search from './components/Search';
import WeatherCard from './components/WeatherCard';
import { SearchResult, WeatherData } from './types/type';
import { useState } from 'react';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLocationSelect = async (result: SearchResult) => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:8081/api/weather/forecast', {
        params: {
          lat: result.lat,
          lon: result.lon,
        },
      });
      setWeatherData(response.data.list);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching weather data', error);
      setIsLoading(false);
    }
  };

  return (
    <div className='p-4 justify-center items-center'>
      <h1 className='text-2xl text-center font-bold mb-4'>Weather App</h1>
      <Search onLocationSelect={handleLocationSelect} />
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
      <div className='md:container md:mx-auto'>
        {!isLoading && weatherData.length > 0 && <WeatherCard weatherData={weatherData} />}
      </div>
    </div>
  );
};

export default App;
