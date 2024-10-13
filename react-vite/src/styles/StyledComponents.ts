import styled from 'styled-components';

export const Screen = styled.div`
  width: 375px;
  height: 730px;
  background-color: #2c2c54;
  border-radius: 40px;
  padding: 20px;
  color: white;
  font-family: Arial, sans-serif;
  position: relative;
  overflow: hidden;
`;

export const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;

export const Header = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
`;

export const Temperature = styled.div`
  font-size: 72px;
  margin-bottom: 10px;
`;

export const WeatherInfo = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const HouseImage = styled.div`
  width: 200px;
  height: 200px;
  background-color: #474787;
  border-radius: 20px;
  margin: 20px auto;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  }
`;

export const HourlyForecast = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const HourlyItem = styled.div`
  text-align: center;
  background-color: #474787;
  padding: 10px;
  border-radius: 10px;
`;

export const WeatherCard = styled.div`
  background-color: #474787;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  background-color: #474787;
  border: none;
  border-radius: 20px;
  color: white;
  margin-bottom: 20px;
`;