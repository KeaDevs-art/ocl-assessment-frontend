import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import Dashboard from "./components/dashboard/dashboard.component";
import PrivateRoute from "./components/routing/privateRoute.component";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div className="search-bar">
//         <div className="search-container">
//           <span className="search-icon">🔍</span>
//           <input type="text" className="search-input" placeholder="Search" />
//         </div>

//         <div className="location">
//           <span>📍</span>
//           <div className="location-text">
//             <span className="location-name">Lagos,</span>
//             <span className="location-country">Nigeria</span>
//           </div>
//         </div>

//         <div className="theme-toggle">🌙</div>

//         <div className="user-avatar">
//           <img src="/api/placeholder/40/40" alt="User profile" />
//         </div>
//       </div>

//       <div className="navigation">
//         <div className="nav-item active">Today</div>
//         <div className="nav-item">Tomorrow</div>
//         <div className="nav-item">Next 7 days</div>
//       </div>

//       <div className="forecast-container">
//         <div className="forecast-card current-weather">
//           <div className="forecast-day">Monday</div>
//           <div className="forecast-time">12:55 PM</div>
//           <div className="weather-icon">☀️</div>
//           <div className="temperature">26°</div>
//           <div className="weather-details">
//             <div className="weather-detail">Real feel: 28</div>
//             <div className="weather-detail">Humidity: 2%</div>
//             <div className="weather-detail">Pressure: 900MB</div>
//             <div className="weather-detail">Wind NE: 23.3-4km/h</div>
//           </div>
//         </div>

//         <div className="forecast-card">
//           <div className="forecast-day">Tue</div>
//           <div className="forecast-icon">☁️</div>
//           <div className="temperature">12°</div>
//         </div>

//         <div className="forecast-card">
//           <div className="forecast-day">Tue</div>
//           <div className="forecast-icon">🌧️</div>
//           <div className="temperature">8°</div>
//         </div>

//         <div className="forecast-card">
//           <div className="forecast-day">Tue</div>
//           <div className="forecast-icon">⚡</div>
//           <div className="temperature">7°</div>
//         </div>

//         <div className="forecast-card">
//           <div className="forecast-day">Tue</div>
//           <div className="forecast-icon">☁️</div>
//           <div className="temperature">15°</div>
//         </div>

//         <div className="forecast-card">
//           <div className="forecast-day">Tue</div>
//           <div className="forecast-icon">🌞</div>
//           <div className="temperature">22°</div>
//         </div>
//       </div>

//       <div className="rain-container">
//         <div className="chance-of-rain">
//           <h3 className="section-title">Chance of rain</h3>
//           <div className="rain-types">
//             <div>Heavy</div>
//             <div>Rainy</div>
//             <div>Humid</div>
//             <div>Sunny</div>
//           </div>
//           <div className="rain-chart">
//             <svg
//               width="100%"
//               height="100%"
//               viewBox="0 0 400 100"
//               preserveAspectRatio="none"
//             >
//               <path
//                 d="M0,80 Q100,80 150,70 T250,40 T400,60"
//                 stroke="#78d9f1"
//                 fill="none"
//                 stroke-width="3"
//               />
//               <circle cx="250" cy="40" r="5" fill="#78d9f1" />
//             </svg>
//           </div>
//           <div className="rain-labels">
//             <div className="rain-label">10AM</div>
//             <div className="rain-label">11AM</div>
//             <div className="rain-label">12AM</div>
//             <div className="rain-label">01PM</div>
//             <div className="rain-label">02PM</div>
//             <div className="rain-label">03PM</div>
//             <div className="rain-label">04PM</div>
//           </div>
//         </div>
//       </div>

//       <div className="global-map-container">
//         <h3 className="section-title">Global Map</h3>
//         <div className="map-container">
//           <img
//             src="/api/placeholder/800/200"
//             alt="World map"
//             className="map-image"
//           />
//           {/* <!-- Map markers --> */}
//           <div className="map-marker" style={{top: "35%", left: "25%"}}></div>
//           <div className="map-marker" style={{top: "25%", left: "75%"}}></div>
//           <div className="map-marker" style={{top: "40%", left: "48%"}}></div>
//           <div className="map-marker" style={{top: "60%", left: "25%"}}></div>
//           <div className="map-marker" style={{top: "65%", left: "80%"}}></div>
//           <div className="map-marker" style={{top: "65%", left: "80%"}}></div>
//         </div>
//       </div>

//       <div className="cities-container">
//         <div className="cities-header">
//           <h3 className="section-title">Cities close to you</h3>
//           <div className="see-more">See more ›</div>
//         </div>

//         <div className="nearby-cities">
//           <div className="city-card">
//             <div className="city-country">Nigeria</div>
//             <div className="city-name">Ogun</div>
//             <div className="city-weather">
//               <div className="city-condition">Cloudy</div>
//               <div className="city-temp">19°</div>
//             </div>
//           </div>

//           <div className="city-card">
//             <div className="city-country">Nigeria</div>
//             <div className="city-name">Ibadan</div>
//             <div className="city-weather">
//               <div className="city-condition">Raining</div>
//               <div className="city-temp">26°</div>
//             </div>
//           </div>

//           <div className="city-card">
//             <div className="city-country">Nigeria</div>
//             <div className="city-name">Oshogbo</div>
//             <div className="city-weather">
//               <div className="city-condition">Snowing</div>
//               <div className="city-temp">-2°</div>
//             </div>
//           </div>

//           <div className="city-card">
//             <div className="city-country">Nigeria</div>
//             <div className="city-name">Ekiti</div>
//             <div className="city-weather">
//               <div className="city-condition">Humid</div>
//               <div className="city-temp">12°</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
