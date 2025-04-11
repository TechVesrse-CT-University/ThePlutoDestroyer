import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';


const features = [
  {
    title: "Crop Planning & Guidance",
    desc: "Smart crop suggestions based on your region, soil type, and weather.",
    image: "/cropplaning.png",
    route: "/cropguidance"
  },
  {
    title: "Weather Forecasting",
    desc: "Real-time updates, 7-day forecasts, and extreme weather alerts.",
    image: "/weatherforcast.jpg",
    route: "/weather"
  },
  {
    title: "Soil & Crop Health",
    desc: "Upload images to monitor crop health. Improve soil quality and detect diseases.",
    image: "/crophealth.webp",
    route: "/soil-health"
  },
  {
    title: "Inventory",
    desc: "Sell produce directly to buyers and compare prices nearby.",
    image: "/inventory.avif",
    route: "/inventory"
  },
  {
    title: "Expert Chatbot",
    desc: "Talk to our AI assistant or real agriculture experts anytime.",
    image: "/chatbot.jpg",
    route: "/chatbot"
  },
  {
    title: "Government Schemes & Loans",
    desc: "Discover active subsidies and apply easily.",
    image: "/govtloan.jpg",
    route: "/govschemes"
  },
];

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="hero-section">
          <div className="overlay">
            <h1>Kisan Vikas</h1>
            <p>Empowering Farmers With Smarter Solutions</p>
            <Link to="/cropguidance" className="hero-button">Get Started</Link>
          </div>
        </div>

        <div className="features-section">
          {features.map((feature, i) => (
            <Link to={feature.route} className="feature-card" key={i}>
              <img src={feature.image} alt={feature.title} />
              <h2>{feature.title}</h2>
              <p>{feature.desc}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
