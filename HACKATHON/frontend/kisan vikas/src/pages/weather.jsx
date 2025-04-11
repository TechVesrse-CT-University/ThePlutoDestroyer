
import React, { useState } from "react";
import axios from "axios";
import "../styles/weather.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const cropOptions = ["Wheat", "Rice", "Maize", "Sugarcane", "Cotton", "Soybean", "Barley", "Millet"];

const CropWeatherAlerts = () => {
  const [location, setLocation] = useState("");
  const [crop, setCrop] = useState("");
  const [phone, setPhone] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const getCoordinates = async (locationName) => {
    const apiKey = "68585739e1ab9f7b3275c3be8d78a91a";
    const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=${apiKey}`;
    const res = await axios.get(geoURL);
    if (res.data.length === 0) {
      throw new Error("Invalid location name");
    }
    return {
      lat: res.data[0].lat,
      lon: res.data[0].lon,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setWeatherData(null);
    setAlerts([]);
    setLoading(true);

    if (!location || !crop) {
      setError("Please enter both location and crop.");
      setLoading(false);
      return;
    }

    try {
      const { lat, lon } = await getCoordinates(location);
      const response = await axios.post("http://127.0.0.1:5000/get_weather", {
        lat,
        lon,
        crop,
        phone,
      });

      setWeatherData(response.data);
      setAlerts(response.data.alerts || []);
      if (phone && response.data.alerts.length > 0) {
        setSuccessMessage("✅ SMS alert sent successfully!");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="alert-container">
        <div className="alert-box">
          <h1>🌾 Crop Weather Alert System</h1>

          <form onSubmit={handleSubmit} className="alert-form">
            <input
              type="text"
              placeholder="Enter your location (e.g., Delhi)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              required
            >
              <option value="">-- Select Crop --</option>
              {cropOptions.map((cropName, i) => (
                <option key={i} value={cropName}>
                  {cropName}
                </option>
              ))}
            </select>

            <input
              type="tel"
              placeholder="Phone number (for SMS alerts)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Checking..." : "Check Weather"}
            </button>
          </form>

          {error && <div className="error-message">❌ {error}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          {weatherData && (
            <div className="result-box">
              <h2>🌦 Weather Report</h2>
              <p>🌡 Temperature: <strong>{weatherData.temperature}°C</strong></p>
              <p>💧 Humidity: <strong>{weatherData.humidity}%</strong></p>
              <p>🌧 Rain: <strong>{weatherData.rain} mm</strong></p>

              {alerts.length > 0 ? (
                <>
                  <p className="alert-heading">⚠ Alerts:</p>
                  <ul className="alert-list">
                    {alerts.map((alert, idx) => (
                      <li key={idx}>🚨 {alert.replace("_", " ")}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="no-alert">✅ No alerts. Weather is favorable.</p>
              )}

              <p className="debug-heading">ℹ Debug Info:</p>
              <pre>{JSON.stringify(weatherData.debug, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CropWeatherAlerts;
