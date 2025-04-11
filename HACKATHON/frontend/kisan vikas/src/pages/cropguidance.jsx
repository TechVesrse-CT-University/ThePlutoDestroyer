import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../styles/guidance.css';

const CropPlanning = () => {
  return (
    <>
      <Navbar />
      <div className="crop-planning-page">
        <div className="hero">
          <div className="overlay">
            <h1>Crop Planning & Guidance</h1>
            <p>Smart suggestions based on your region, soil, and weather.</p>
          </div>
        </div>

        <section className="crop-section">
          <h2 className='crop-section-title'>Why Smart Crop Planning?</h2>
          <p className='crop-section-description'>
            Traditional farming methods often lead to guesswork and losses. With smart crop planning,
            farmers can select the right crop at the right time, using soil and weather data, boosting both yield and income.
          </p>
        </section>

        <section className="how-it-works">
          <h2 className='how-it-works-title'>How It Works</h2>
          <div className="steps">
            <div className="step-card">
              <h3>📍 Step 1: Location & Soil Input</h3>
              <p>Enter your farm’s location and soil type. We'll fetch local climate and soil health data.</p>
            </div>
            <div className="step-card">
              <h3>📊 Step 2: AI-Based Analysis</h3>
              <p>Our system analyzes crop history, market demand, and weather patterns for personalized recommendations.</p>
            </div>
            <div className="step-card">
              <h3>✅ Step 3: Get a Smart Plan</h3>
              <p>Receive a crop plan with sowing dates, irrigation, fertilizers, and yield predictions.</p>
            </div>
          </div>
        </section>

        <section className="benefits">
          <h2 className='benefits-title'>Benefits</h2>
          <ul className="benefit-list">
            <li>✅ Improved productivity and yield</li>
            <li>📈 Better income from high-demand crops</li>
            <li>🧠 Scientifically planned sowing/harvesting</li>
            <li>🌧️ Smart irrigation and fertilizer schedule</li>
          </ul>
        </section>

        <section className="crop-recommendations">
          <h2 className='seasonal-title'>Seasonal Crop Recommendations</h2>
          <div className="crop-cards">
            <div className="recommend-card">
              <h4>🌸 Spring</h4>
              <p>Wheat, Mustard, Corn</p>
            </div>
            <div className="recommend-card">
              <h4>☀️ Summer</h4>
              <p>Paddy, Sugarcane, Cotton</p>
            </div>
            <div className="recommend-card">
              <h4>🍁 Autumn</h4>
              <p>Maize, Barley, Bajra</p>
            </div>
            <div className="recommend-card">
              <h4>❄️ Winter</h4>
              <p>Chickpea, Lentils, Peas</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CropPlanning;
