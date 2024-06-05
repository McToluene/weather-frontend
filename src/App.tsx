import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { WeatherProvider } from './context/WeatherContext';
import DetailedWeather from './components/DetailedWeather';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <WeatherProvider>
      <div className='bg-gradient-to-b from-blue-200 to-blue-50 bg-blue-50 h-screen'>
        <div className='md:container md:mx-auto'>
          <Router>
            <div className='p-4 text-center'>
              <h1 className='text-2xl font-bold mb-4'>Weather App</h1>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/details' element={<DetailedWeather />} />
              </Routes>
            </div>
          </Router>
        </div>
      </div>
    </WeatherProvider>
  );
};

export default App;
