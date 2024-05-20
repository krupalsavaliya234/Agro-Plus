import React, { useState } from "react";
import "./weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({
    Cloud: "",
    Temperature: "",
    Humidity: "",
    Wind: "",
    error: ""
  });

  const showWeather = (event) => {
    event.preventDefault();

    const city = document.getElementById("city").value;

    // Make the API request
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=622aae82e07af279c83f9ca3b32ccf14&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        // Update state with weather information
        setWeatherData({
          Cloud: `Weather in ${city}: ${data.weather[0].description}.`,
          Temperature: `Temperature: ${data.main.temp}°C.`,
          Humidity: `Humidity: ${data.main.humidity}%.`,
          Wind: `Wind speed: ${data.wind.speed} m/s.`,
          error: ""
        });
      })
      .catch((error) => {
        // Update state with error message
        setWeatherData({
          Cloud: "",
          Temperature: "",
          Humidity: "",
          Wind: "",
          error: `Error: ${error.message}`
        });
      });
  };

  return (
    <div className="weather-container1">
      <h1>Weather App</h1>
      <div className="weather-part2">
        <form className="weatherform" onSubmit={showWeather}>
          <label htmlFor="city" className="ct">
            Enter city:
          </label>
          <input className="weather-input" type="text" placeholder="enter city name" id="city" name="city" required />
          <button className="weather-button" type="submit">Find Weather</button>
        </form>
        <div id="weather-result">
          <p className="Cloud">{weatherData.Cloud}</p>
          <p className="Temperature">{weatherData.Temperature}</p>
          <p className="Humidity">{weatherData.Humidity}</p>
          <p className="Wind">{weatherData.Wind}</p>
          <p className="error">{weatherData.error}</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
