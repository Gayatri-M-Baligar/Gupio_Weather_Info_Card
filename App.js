
import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import weatherData from "./weatherData";
import "./App.css";

function App() {
  const [index, setIndex] = useState(0);
  const [unit, setUnit] = useState("C"); 

  
  const refreshWeather = () => {
    setIndex((i) => (i + 1) % weatherData.length);
  };

  
  const toggleUnit = () => {
    setUnit((u) => (u === "C" ? "F" : "C"));
  };

  
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === " " || e.key === "r" || e.key === "R") {
        e.preventDefault();
        refreshWeather();
      }
      if (e.key === "u" || e.key === "U") toggleUnit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = weatherData[index];

  return (
    <div className="app-root">
      <div className="app-container">
        <WeatherCard
          data={current}
          unit={unit}
          refreshWeather={refreshWeather}
          toggleUnit={toggleUnit}
        />

        <div className="controls-row">
          <button className="control-btn" onClick={refreshWeather} aria-label="Refresh weather (R or Space)">
            🔄 Refresh
          </button>
          <button className="control-btn" onClick={toggleUnit} aria-label="Toggle Celsius Fahrenheit (U)">
            °C / °F
          </button>
        </div>

        <p className="hint">Keyboard: R / Space → refresh · U → toggle units</p>
      </div>
    </div>
  );
}

export default App;
