import React, { useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Login = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Login");
  const [passwordVisible, setPasswordVisible] = useState(true);

  const HandleClick = () => {
    setPasswordVisible(!passwordVisible);
  };

  const HandleLoginClick = () => {
    setShowLogin(false);
    navigate("/login");
  };

  return (
    <div className="Login-popup">
      <form className="Login-popup-container" onClick={HandleLoginClick}>
        <div className="Login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => navigate(-1)} src={assets.cross_icon} alt="" />
        </div>
        <div className="Login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your name" required />
          )}

          <input type="email" placeholder="Your email Id" required />
          <div className="Login-password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your Password"
              required
            />

            <div className="Login-password-eye" onClick={HandleClick}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="Login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
