import weatherService from "../services/weather";
import { useEffect, useState } from "react";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .getWeather(capital)
      .then((weather) => setWeather(weather))
      .catch((error) => console.log("failed to load the weather", error));
  }, [capital]);

  if (!weather) {
    return null;
  }

  return (
    <>
      <h1>Weather in {capital}</h1>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <div>temperature: {weather.main.temp} Celcius</div>
      <div>wind: {weather.wind.speed} m/s</div>
    </>
  );
};
export default Weather;
