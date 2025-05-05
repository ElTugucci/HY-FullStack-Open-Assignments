import axios from "axios";
const key = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (capital) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${key}`)
    return request.then(respone => respone.data)
}
export default {getWeather}