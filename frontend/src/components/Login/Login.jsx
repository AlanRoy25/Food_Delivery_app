import React, { useContext, useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'

const Login = () => {
  const { setToken } = useContext(StoreContext);

  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Login");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prevdata) => ({ ...prevdata, [name]: value })); // first setting data and the current data fir previous data ko call karke name ko update karre hain.with the current value
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = `${import.meta.env.VITE_API_URL}/api/user`;
;
    if (currentState === "Login") {
      newUrl += "/login"
    } else {
      newUrl += "/signin"
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/'); // Redirect to homepage or another protected route
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during Authentication', error);
      alert('An error occurred, please try again.');
    }
  };

  const HandlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const HandleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="Login-popup">
      <form
        onSubmit={onLogin}
        className="Login-popup-container"
        onClick={HandleLoginClick}
      >
        <div className="Login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => navigate(-1)} src={assets.cross_icon} alt="" />
        </div>
        <div className="Login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              autoComplete="name"
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email Id"
            required
            autoComplete="email"
          />
          <div className="Login-password-container">
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your Password"
              required
            />

            <div className="Login-password-eye" onClick={HandlePasswordVisibility}>
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
