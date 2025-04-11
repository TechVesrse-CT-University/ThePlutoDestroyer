import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <h2>Kisan Vikas</h2>
          <p>
Kisan Vikas isn’t just a platform — it’s a movement to revolutionize farming, one seed at a time.

We blend tradition with technology to give farmers the power of smart decisions at their fingertips. From real-time weather updates to early warnings about crop diseases, we’re turning challenges into opportunities and uncertainty into confidence.

At Kisan Vikas, we believe every farmer deserves access to cutting-edge tools, clear insights, and a community that grows together. Whether you’re sowing your first crop or managing acres of farmland, we’re here to support your journey — with science, simplicity, and a whole lot of heart.

🌱 Kisan Vikas – Grow Smart. Farm Proud.</p>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/market">Inventory</a></li>
            <li><a href="/track">Track Crops</a></li>
            <li><a href="/weather">Weather</a></li>
            <li><a href="/help">Support</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@kisanvikas.in</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: New Delhi, India</p>
        </div>

        <div className="footer-social">
          <h3>Connect</h3>
          <div className="icons">
            <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" alt="Facebook" /></a>
            <a href="#"><img src="https://images.freeimages.com/image/large-previews/f35/x-twitter-logo-on-black-circle-5694247.png" alt="Twitter" /></a>
            <a href="#"><img src="https://static.vecteezy.com/system/resources/previews/023/986/514/non_2x/instagram-logo-instagram-logo-transparent-instagram-icon-transparent-free-free-png.png" alt="Instagram" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 <strong>Kisan Vikas</strong>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
