import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const API_KEY = 'c9a0ca46550648b29ce125849232709';

const Screen = styled.div`
  width: 375px;
  height: 730px;
  background-color: #4a3b8b;
  border-radius: 40px;
  padding: 20px;
  color: white;
  font-family: Arial, sans-serif;
  position: relative;
  overflow: hidden;
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;

const Header = styled.div`
  font-size: 28px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const WeatherInfo = styled.div`
  text-align: center;
`;

const Temperature = styled.div`
  font-size: 72px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Condition = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
  opacity: 0.8;
`;

const MinMax = styled.div`
  font-size: 18px;
  opacity: 0.8;
`;

const HouseImage = styled.img`
  width: 250px;
  height: auto;
  margin: 30px auto;
  display: block;
`;

const HourlyForecast = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  background-color: rgba(94, 76, 168, 0.5);
  border-radius: 20px;
  padding: 20px;
`;

const HourlyItem = styled.div`
  text-align: center;
  font-size: 16px;
`;

const Icon = styled.div`
  font-size: 24px;
  margin: 10px 0;
`;

const MonastirScreen: React.FC<{ selectedCity: string }> = ({ selectedCity }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [hourlyData, setHourlyData] = useState<any>(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (cityName: string) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(cityName)}&days=1&aqi=no&alerts=no`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.current && data.forecast) {
        setWeatherData(data.current);
        setHourlyData(data.forecast.forecastday[0].hour);
      } else {
        throw new Error('Dữ liệu không hợp lệ');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API thời tiết:', error);
      setError('Không lấy được dữ liệu thời tiết.');
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const getWeatherIcon = (condition: string) => {
    if (condition.toLowerCase().includes('rain')) {
      return '🌧️';
    } else if (condition.toLowerCase().includes('cloud')) {
      return '☁️';
    } else {
      return '☀️';
    }
  };

  return (
    <Screen>
      <StatusBar>
        <span>1:41</span>
        <span>🔋</span>
      </StatusBar>
      <Header>{selectedCity}</Header>

      {error && <div>{error}</div>}

      {weatherData && (
        <WeatherInfo>
          <Temperature>{Math.round(weatherData.temp_c)}°</Temperature>
          <Condition>{weatherData.condition.text}</Condition>
          <MinMax>Max:{Math.round(weatherData.temp_c + 3)}° Min:{Math.round(weatherData.temp_c - 2)}°</MinMax>
        </WeatherInfo>
      )}

<HouseImage src="/images/Screenshot 2024-10-13 143055.png" alt="Cute weather house" />

      {hourlyData && (
        <HourlyForecast>
          {hourlyData.slice(0, 5).map((hour: any, index: number) => (
            <HourlyItem key={index}>
              <div>{new Date(hour.time).getHours()}:00</div>
              <Icon>{getWeatherIcon(hour.condition.text)}</Icon>
              <div>{Math.round(hour.temp_c)}°</div>
            </HourlyItem>
          ))}
        </HourlyForecast>
      )}
    </Screen>
  );
};

export default MonastirScreen;