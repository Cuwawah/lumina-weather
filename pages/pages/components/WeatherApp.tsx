import React, { useState } from 'react';
import Head from 'next/head';

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Replace with your actual key - keep the quotes!
  const API_KEY = 'a3e9b8b021154e85ba8215015261601'; 

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    try {
      // API call structure for WeatherAPI.com
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      const data = await res.json();

      if (data.error) {
        alert(data.error.message);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- STYLING OBJECTS ---
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle at top right, #1e293b, #0f172a)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    padding: 0,
    overflow: 'hidden'
  };

  const glassStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: '32px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    padding: '40px',
    color: 'white',
    textAlign: 'center',
    width: '340px',
    transition: 'all 0.5s ease'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 24px',
    borderRadius: '100px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    fontSize: '16px',
    outline: 'none',
    marginBottom: '30px',
    boxSizing: 'border-box'
  };

    return (
      <div style={containerStyle}>
        <Head>
          <title>Lumina | Weather</title>
        </Head>

        {/* Brand Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px',
            marginBottom: '4px' 
          }}>
            {/* Simple SVG Logo Icon */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="white" fillOpacity="0.9"/>
              <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>

            <h1 style={{ 
              fontSize: '36px', 
              fontWeight: '800', 
              letterSpacing: '-1px',
              margin: 0,
              background: 'linear-gradient(to bottom, #ffffff 0%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Lumina
            </h1>
          </div>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.4)', 
            fontSize: '11px', 
            fontWeight: '600',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            margin: 0
          }}>
            Precision Forecasting
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={fetchWeather} style={{ width: '340px' }}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </form>

        

      {loading && <p style={{ color: 'white', opacity: 0.5 }}>Fetching the atmosphere...</p>}

      {weather && weather.current && (
        <div style={glassStyle}>
          <div style={{ fontSize: '14px', textTransform: 'uppercase', tracking: '2px', opacity: 0.6 }}>
            {weather.location.name}, {weather.location.country}
          </div>

          <div style={{ fontSize: '80px', fontWeight: 800, margin: '10px 0' }}>
            {Math.round(weather.current.temp_c)}°
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
             <img src={weather.current.condition.icon} alt="weather icon" style={{ width: '48px' }} />
             <span style={{ fontSize: '18px', fontWeight: 500 }}>{weather.current.condition.text}</span>
          </div>

          <div style={{ 
            marginTop: '30px', 
            paddingTop: '20px', 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
            display: 'flex', 
            justifyContent: 'space-between',
            fontSize: '13px',
            opacity: 0.8
          }}>
            <div>
              <div style={{ opacity: 0.5 }}>WIND</div>
              <div>{weather.current.wind_kph} kph</div>
            </div>
            <div>
              <div style={{ opacity: 0.5 }}>HUMIDITY</div>
              <div>{weather.current.humidity}%</div>
            </div>
            <div>
              <div style={{ opacity: 0.5 }}>FEELS LIKE</div>
              <div>{Math.round(weather.current.feelslike_c)}°</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}