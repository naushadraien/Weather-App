import { useState } from "react";
import "./App.css";
import CurrentWeather from "./components/currentWeather/currentWeather";
import Search from "./components/search/search";
import WeatherForecast from "./components/forecasts/weatherForecast";
import axios from "axios";

//Using with axios request

function App() {
  //initial value is null
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = (searchData) => {
    //[lat, lon] are variables and searchData.value.split(" ") will split latitude and longitude by space
    const [lat, lon] = searchData.value.split(" ");

    const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
    const WEATHER_API_KEY = "1c6565ada823323167521d05acd4ed7b";

    //fetching the current weather
    //here &units=metric is used for showing the temperature in celcius
    //  const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    //with axios request
    const currentWeatherFetch = axios.get(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    //fetching the weather forecast
    //here &units=metric is used for showing the temperature in celcius
    //  const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    //with axios request
    const forecastFetch = axios.get(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        //calling the json from api of index 0 for weather and 1 for forecast

        // const WeatherResponse =  await response[0].json();
        // const ForecastResponse =  await response[1].json();

        //with axios
        const WeatherResponse = response[0].data;
        const ForecastResponse = response[1].data;

        // these two set get the data of weather and response
        //displaying the city and country code
        // here label is coming from the label of search.js
        //... are spread operator to create new object from WeatherResponse and ForecastResponse
        setCurrentWeather({ city: searchData.label, ...WeatherResponse });
        setForecast({ city: searchData.label, ...ForecastResponse });
      })
      .catch((err) => console.log(err));
  };
  // console.log(currentWeather);
  // console.log(forecast);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {/* Here && for checking if the data exist or not. if it exists then show the data and if not so don't show the data */}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <WeatherForecast data={forecast} />}
    </div>
  );
}

export default App;
