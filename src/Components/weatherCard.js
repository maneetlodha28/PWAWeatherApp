import React from "react";

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="city">
      <h2 className="city-name">
        <span>{weatherData.name}</span>
        <sup>{weatherData.sys.country}</sup>
      </h2>
      <div className="city-temp">
        {Math.round(weatherData.main.temp)}
        <sup>&deg;C</sup>
      </div>
      <div className="info">
        <img
          className="city-icon"
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
        />
        <p>{weatherData.weather[0].description}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
