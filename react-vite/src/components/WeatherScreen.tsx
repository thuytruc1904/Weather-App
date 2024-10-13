import React, { useState, useEffect } from 'react';
import { Screen, StatusBar, Header } from '../styles/StyledComponents';
import { RainIcon, SunIcon, CloudIcon, WindIcon } from './Icons';
import styled from 'styled-components';

const API_KEY = 'c9a0ca46550648b29ce125849232709';

const SearchWrapper = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  flex-grow: 1;
  padding: 10px 15px;
  background-color: #474787;
  border: none;
  border-radius: 20px 0 0 20px;
  color: white;
  font-size: 16px;

  &::placeholder {
    color: #a0a0c0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #6c6cb2;
  }
`;

const SearchButton = styled.button`
  background-color: #474787;
  border: none;
  border-radius: 0 20px 20px 0;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5a5a9f;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ForecastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ForecastCard = styled.div`
  background-color: #474787;
  border-radius: 20px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WeatherIcon = styled.div`
  width: 40px;
  height: 40px;
`;

const WeatherScreen: React.FC<{ setCityForMonastirScreen: (city: string) => void }> = ({ setCityForMonastirScreen }) => {
  const [city, setCity] = useState('Da Nang');
  const [forecastData, setForecastData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const fetchThreeDayForecast = async (cityName: string) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(cityName)}&days=3&aqi=no&alerts=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.forecast) {
        setForecastData(data.forecast.forecastday);
        setCityForMonastirScreen(cityName);
      } else {
        throw new Error('Invalid data');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Unable to fetch weather data.');
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      setCity(searchTerm);
      fetchThreeDayForecast(searchTerm);
    }
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.toLowerCase().includes('rain')) return <RainIcon />;
    if (condition.toLowerCase().includes('sun') || condition.toLowerCase().includes('clear')) return <SunIcon />;
    if (condition.toLowerCase().includes('cloud')) return <CloudIcon />;
    return <WindIcon />;
  };

  useEffect(() => {
    fetchThreeDayForecast(city);
  }, []);

  return (
    <Screen>
      <StatusBar>
        <span>1:41</span>
        <span>🔋</span>
      </StatusBar>
      <Header>Weather Forecast</Header>
      <SearchWrapper>
        <SearchBar
          placeholder="Search for a city"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <SearchButton onClick={handleSearch}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </SearchButton>
      </SearchWrapper>

      {error && <div>{error}</div>}

      {forecastData && (
        <ForecastWrapper>
          <h3>3-Day Forecast for {city}</h3>
          {forecastData.map((day: any, index: number) => (
            <ForecastCard key={index}>
              <div>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
              <WeatherIcon>{getWeatherIcon(day.day.condition.text)}</WeatherIcon>
              <div>{day.day.condition.text}</div>
              <div>{Math.round(day.day.maxtemp_c)}°C / {Math.round(day.day.mintemp_c)}°C</div>
            </ForecastCard>
          ))}
        </ForecastWrapper>
      )}
    </Screen>
  );
};

export default WeatherScreen;