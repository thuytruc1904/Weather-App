const API_KEY = 'c9a0ca46550648b29ce125849232709';
const city = 'Bangkok'; 

const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

fetch(currentWeatherUrl)
  .then(response => response.json())
  .then(data => {
    console.log('Current Weather Data:', data);
  })
  .catch(error => console.error('Error fetching current weather:', error));

const hourlyWeatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`;

fetch(hourlyWeatherUrl)
  .then(response => response.json())
  .then(data => {
    console.log('Hourly Weather Data:', data.forecast.forecastday[0].hour);
  })
  .catch(error => console.error('Error fetching hourly weather:', error));

const fiveDayForecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=6&aqi=no&alerts=no`;

fetch(fiveDayForecastUrl)
  .then(response => response.json())
  .then(data => {
    const forecastDays = data.forecast.forecastday;

    console.log('All Forecast Days:', forecastDays);

    const nextFiveDays = forecastDays.slice(1, 6);
    console.log('Next 5 Days:', nextFiveDays);

  })
  .catch(error => console.error('Error fetching 5-day forecast:', error));

