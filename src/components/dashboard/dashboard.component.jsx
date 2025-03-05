// components/dashboard/Dashboard.js
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import WeatherService from "../../services/weather.service";
import "./dashboard.css";

const Dashboard = () => {
  const { user, logout, addFavoriteCity, removeFavoriteCity } =
    useContext(AuthContext);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentCity, setCurrentCity] = useState("Lagos");
  const [currentCountry, setCurrentCountry] = useState("Nigeria");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const weatherData = await WeatherService.getCurrentWeather(currentCity);
        const forecastData = await WeatherService.getForecast(currentCity);

        setCurrentWeather(weatherData);
        setForecast(forecastData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [currentCity]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") return;

    try {
      const results = await WeatherService.searchCity(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for city:", error);
    }
  };

  const selectCity = (city) => {
    setCurrentCity(city.name);
    setCurrentCountry(city.country);
    setSearchResults([]);
    setSearchTerm("");
  };

  const addToFavorites = () => {
    if (!currentWeather) return;

    const city = {
      name: currentCity,
      country: currentCountry,
      weather: currentWeather.weather[0].main,
      temperature: Math.round(currentWeather.main.temp),
    };

    addFavoriteCity(city);
  };

  const removeFromFavorites = (cityName) => {
    removeFavoriteCity(cityName);
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
        return "🌧️";
      case "Thunderstorm":
        return "⚡";
      case "Snow":
        return "❄️";
      case "Mist":
      case "Fog":
        return "🌫️";
      default:
        return "☁️";
    }
  };

  if (loading && !currentWeather) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="search-bar">
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search for a city"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((city, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => selectCity(city)}
                >
                  {city.name}, {city.country}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="location">
          <span>📍</span>
          <div className="location-text">
            <span className="location-name">{currentCity},</span>
            <span className="location-country">{currentCountry}</span>
          </div>
        </div>

        <div className="theme-toggle">🌙</div>

        <div className="user-menu">
          <div className="user-avatar">
            <img src="/api/placeholder/40/40" alt="User avatar" />
          </div>
          <div className="user-dropdown">
            <div className="user-info">
              <p>{user && user.name}</p>
              <p className="user-email">{user && user.email}</p>
            </div>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="navigation">
        <div className="nav-item active">Today</div>
        <div className="nav-item">Tomorrow</div>
        <div className="nav-item">Next 7 days</div>
      </div>
      {currentWeather && (
        <div className="forecast-container">
          <div className="forecast-card current-weather">
            <div className="forecast-day">
              {new Date().toLocaleDateString("en-US", { weekday: "long" })}
            </div>
            <div className="forecast-time">
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="weather-icon">
              {getWeatherIcon(currentWeather.weather[0].main)}
            </div>
            <div className="temperature">
              {Math.round(currentWeather.main.temp)}°
            </div>
            <div className="weather-details">
              <div className="weather-detail">
                Real feel: {Math.round(currentWeather.main.feels_like)}
              </div>
              <div className="weather-detail">
                Humidity: {currentWeather.main.humidity}%
              </div>
              <div className="weather-detail">
                Pressure: {currentWeather.main.pressure}MB
              </div>
              <div className="weather-detail">
                Wind{" "}
                {currentWeather.wind.deg
                  ? WeatherService.degToDirection(currentWeather.wind.deg)
                  : "N"}
                : {Math.round(currentWeather.wind.speed * 3.6)}km/h
              </div>
              <button className="favorite-button" onClick={addToFavorites}>
                Add to Favorites
              </button>
            </div>
          </div>

          {forecast.slice(0, 5).map((day, index) => (
            <div className="forecast-card" key={index}>
              <div className="forecast-day">
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </div>
              <div className="forecast-icon">
                {getWeatherIcon(day.weather[0].main)}
              </div>
              <div className="temperature">{Math.round(day.main.temp)}°</div>
            </div>
          ))}
        </div>
      )}
      <div className="favorites-container">
        <h3 className="section-title">Favorite Cities</h3>
        <div className="favorites-grid">
          {user && user.favoriteCities && user.favoriteCities.length > 0 ? (
            user.favoriteCities.map((city, index) => (
              <div className="city-card" key={index}>
                <div className="city-country">{city.country}</div>
                <div className="city-name">{city.name}</div>
                <div className="city-weather">
                  <div className="city-condition">{city.weather}</div>
                  <div className="city-temp">{city.temperature}°</div>
                </div>
                <div className="city-actions">
                  <button
                    className="city-select"
                    onClick={() => selectCity(city)}
                  >
                    View
                  </button>
                  <button
                    className="city-remove"
                    onClick={() => removeFromFavorites(city.name)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-favorites">No favorite cities yet. Add some!</p>
          )}
        </div>
      </div>
      <div className="global-map-container">
        <h3 className="section-title">Global Map</h3>
        <div className="map-container">
          <img
            src="/api/placeholder/800/200"
            alt="World map"
            className="map-image"
          />
          <div className="map-marker" style={{ top: "35%", left: "25%" }}></div>
          <div className="map-marker" style={{ top: "25%", left: "75%" }}></div>
          <div className="map-marker" style={{ top: "40%", left: "48%" }}></div>
          <div className="map-marker" style={{ top: "60%", left: "25%" }}></div>
          <div className="map-marker" style={{ top: "65%", left: "80%" }}></div>
        </div>
      </div>
      <div className="chance-of-rain">
        <h3 className="section-title">Chance of Rain</h3>
        <div className="rain-chart">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 Q100,80 150,70 T250,40 T400,60"
              stroke="#78d9f1"
              fill="none"
              strokeWidth="3"
            />
            <circle cx="250" cy="40" r="5" fill="#78d9f1" />
          </svg>
        </div>
        <div className="rain-labels">
          {["10AM", "11AM", "12AM", "01PM", "02PM", "03PM", "04PM"].map(
            (time, index) => (
              <div key={index} className="rain-label">
                {time}
              </div>
            )
          )}
        </div>
      </div>
      <div className="nearby-cities-container">
        <h3 className="section-title">Cities close to you</h3>
        <div className="nearby-cities">
          {[
            { name: "Ogun", country: "Nigeria", condition: "Cloudy", temp: 19 },
            {
              name: "Ibadan",
              country: "Nigeria",
              condition: "Raining",
              temp: 26,
            },
            {
              name: "Oshogbo",
              country: "Nigeria",
              condition: "Snowing",
              temp: -2,
            },
            { name: "Ekiti", country: "Nigeria", condition: "Humid", temp: 12 },
          ].map((city, index) => (
            <div key={index} className="city-card">
              <div className="city-country">{city.country}</div>
              <div className="city-name">{city.name}</div>
              <div className="city-weather">
                <div className="city-condition">{city.condition}</div>
                <div className="city-temp">{city.temp}°</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
