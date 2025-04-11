import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: "url('../../public/loginbg.jpg')" }}
    >
      <div className="auth-box">
        <h2>{isLogin ? "LOGIN" : "SIGN-UP"} / ਲੌਗਇਨ / ਸਾਈਨ-ਅੱਪ</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <span className="error">{error}</span>}

          <button type="submit">{isLogin ? "LOGIN" : "SIGN-UP"}</button>
        </form>

        <p className="switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
