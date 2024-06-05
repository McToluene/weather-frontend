import { useContext } from 'react';
import Search from '../components/Search';
import WeatherCard from '../components/WeatherCard';
import { WeatherContext } from '../context/WeatherContext';
import { SearchResult } from '../types/type';
import axios from 'axios';

const Home: React.FC = () => {
  const { setWeatherForecast: setWeatherData, setIsLoading } = useContext(WeatherContext)!;

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
    } catch (error) {
      console.error('Error fetching weather data', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Search onLocationSelect={handleLocationSelect} />
      <WeatherCard />
    </>
  );
};

export default Home;
