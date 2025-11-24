// src/WeatherCard.js
import React from "react";

/* helper to convert */
const cToF = (c) => Math.round((c * 9) / 5 + 32);

const ICONS = {
  Sunny: (
    <svg viewBox="0 0 64 64" className="icon sun" aria-hidden>
      <circle cx="32" cy="28" r="12" fill="white" opacity="0.95" />
      <g stroke="white" strokeWidth="2">
        <line x1="32" y1="2" x2="32" y2="14" />
        <line x1="32" y1="42" x2="32" y2="54" />
        <line x1="2" y1="28" x2="14" y2="28" />
        <line x1="50" y1="28" x2="62" y2="28" />
      </g>
    </svg>
  ),
  Cloudy: (
    <svg viewBox="0 0 64 64" className="icon cloud" aria-hidden>
      <ellipse cx="30" cy="30" rx="18" ry="12" fill="white" opacity="0.95" />
      <ellipse cx="46" cy="34" rx="12" ry="9" fill="white" opacity="0.95" />
    </svg>
  ),
  Rainy: (
    <svg viewBox="0 0 64 64" className="icon rain" aria-hidden>
      <ellipse cx="30" cy="26" rx="18" ry="12" fill="white" opacity="0.95" />
      <g stroke="white" strokeWidth="2" strokeLinecap="round">
        <line x1="22" y1="44" x2="22" y2="54" />
        <line x1="30" y1="44" x2="30" y2="54" />
        <line x1="38" y1="44" x2="38" y2="54" />
      </g>
    </svg>
  ),
  Windy: (
    <svg viewBox="0 0 64 64" className="icon wind" aria-hidden>
      <path d="M6 28c6-8 18-10 28-6s14 12 6 18" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  Hot: (
    <svg viewBox="0 0 64 64" className="icon sun" aria-hidden>
      <circle cx="32" cy="28" r="12" fill="white" opacity="0.95" />
    </svg>
  )
};

const BG = {
  Sunny: "linear-gradient(135deg,#f7b733,#ff6a00)",
  Cloudy: "linear-gradient(135deg,#8e9eab,#eef2f3)",
  Rainy: "linear-gradient(135deg,#2b5876,#4e4376)",
  Windy: "linear-gradient(135deg,#76b852,#8DC26F)",
  Hot: "linear-gradient(135deg,#ff9966,#ff5e62)"
};

export default function WeatherCard({ data, unit, refreshWeather, toggleUnit }) {
  const displayed = unit === "C" ? `${data.temp}°C` : `${cToF(data.temp)}°F`;
  const feels = unit === "C" ? `${data.feels}°C` : `${cToF(data.feels)}°F`;
  const bg = BG[data.condition] || BG.Sunny;

  return (
    <article
      className="weather-card"
      style={{ background: bg }}
      role="region"
      aria-label={`Weather for ${data.location}`}
    >
      <div className="top-row">
        <div>
          <div id="loc" className="loc" aria-live="polite">
            {data.location}
          </div>
          <div className="condition" aria-live="polite">
            {data.condition}
          </div>
        </div>

        <div className="icon-area" aria-hidden>
          {ICONS[data.condition] || ICONS.Sunny}
        </div>
      </div>

      <div className="temp-row">
        <div className="temp" aria-live="polite">{displayed}</div>
        <div className="extra">Feels like {feels} • Humidity {data.humidity}%</div>
      </div>

      <div className="card-actions">
        <button className="small-btn" onClick={refreshWeather} aria-label="Refresh weather">Refresh</button>
        <button className="small-btn" onClick={toggleUnit} aria-label="Toggle Celsius Fahrenheit">°C/°F</button>
      </div>
    </article>
  );
}
  