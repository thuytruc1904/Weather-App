import React, { useState } from 'react';
import styled from 'styled-components';
import MonastirScreen from './components/MonastirScreen';
import WeatherScreen from './components/WeatherScreen';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a2e;
  padding: 20px;
`;

const ScreensContainer = styled.div`
  display: flex;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
`;

const ScreenWrapper = styled.div`
  flex: 1;
  max-width: 375px;
  margin: 0 auto;
`;

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Da Nang');

  return (
    <AppContainer>
      <ScreensContainer>
        <ScreenWrapper>
          <MonastirScreen selectedCity={selectedCity} />
        </ScreenWrapper>
        <ScreenWrapper>
          <WeatherScreen setCityForMonastirScreen={setSelectedCity} />
        </ScreenWrapper>
      </ScreensContainer>
    </AppContainer>
  );
};

export default App;