// services/WeatherService.js
import axios from "axios";

// const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const API_KEY = "30104f56334a8dfa7e2b3a663e9670bb";
const BASE_URL = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5";
const lat = "-25.9975353";
const lon = "28.1239603"

const WeatherService = {
  async getCurrentWeather(city) {
    try {
      const response = await axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw error;
    }
  },

  async getForecast(city) {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      // Group forecast by day
      const dailyForecast = response.data.list.filter(
        (item) => new Date(item.dt * 1000).getHours() === 12
      );
      return dailyForecast;
    } catch (error) {
      console.error("Error fetching forecast:", error);
      throw error;
    }
  },

  async searchCity(query) {
    try {
      const response = await axios.get(`${BASE_URL}/find`, {
        params: {
          q: query,
          type: "like",
          sort: "population",
          cnt: 5,
          appid: API_KEY,
        },
      });
      return response.data.list.map((city) => ({
        name: city.name,
        country: city.sys.country,
      }));
    } catch (error) {
      console.error("Error searching for city:", error);
      throw error;
    }
  },

  degToDirection(deg) {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  },
};

export default WeatherService;
