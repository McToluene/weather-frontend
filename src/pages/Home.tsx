import { useContext, useState } from 'react';
import Search from '../components/Search';
import WeatherCard from '../components/WeatherCard';
import { WeatherContext } from '../context/WeatherContext';
import { SearchResult } from '../types/type';
import axios from 'axios';

const Home: React.FC = () => {
  const { setWeatherForecast: setWeatherData, setIsLoading } = useContext(WeatherContext)!;
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleLocationSelect = async (result: SearchResult) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/weather/forecast`, {
        params: {
          lat: result.lat,
          lon: result.lon,
        },
      });
      console.log(response);
      setWeatherData(response.data);
      setIsLoading(false);
    } catch (error: any) {
      console.error('Error fetching weather data', error);
      setIsLoading(false);
      if (error.response && error.response.status === 404) {
        showToast('Location not found');
      } else {
        showToast('An error occurred');
      }
    }
  };

  return (
    <>
      <Search onLocationSelect={handleLocationSelect} />
      <WeatherCard />
      {toastMessage && (
        <div className='fixed bottom-0 left-0 w-full bg-red-500 text-white text-center p-2'>
          {toastMessage}
        </div>
      )}
    </>
  );
};

export default Home;
