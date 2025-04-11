import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-logo">
        <img src="/logo KV.png" alt="Logo" />
      </div>
      <div className="navbar-links">
        <Link to="/home">HOME</Link>
        <Link to="/inventory">INVENTORY</Link>
        <Link to="/track">TRACK CROPS</Link>
        <Link to="/weather">WEATHER ALERTS !</Link>
        <Link to="/help">HELP ?</Link>
      </div>
    </nav>
  );
};

export default Navbar;
