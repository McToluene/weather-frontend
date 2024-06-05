import React, { createContext, useState, ReactNode } from 'react';
import { WeatherForecast, DetailedWeatherData } from '../types/type';

interface WeatherContextProps {
  weatherForecast: WeatherForecast | null;
  setWeatherForecast: React.Dispatch<React.SetStateAction<WeatherForecast | null>>;
  detailedWeatherData: DetailedWeatherData | null;
  setDetailedWeatherData: React.Dispatch<React.SetStateAction<DetailedWeatherData | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast | null>(null);
  const [detailedWeatherData, setDetailedWeatherData] = useState<DetailedWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <WeatherContext.Provider
      value={{
        weatherForecast,
        setWeatherForecast,
        detailedWeatherData,
        setDetailedWeatherData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
