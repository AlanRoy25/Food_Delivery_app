import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token ,setToken } = useContext(StoreContext);
  
  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    navigate('/')
  }
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to= "/menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </Link>
        </li>
        <li>
          <Link to="/app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Mobile App
          
          </Link>
            
        </li>
        <li>
          <Link
            to="/footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact Us
         </Link>
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search icon" />
        <div className="navbar-search-icon">
          <div className="cart-container">
            <Link to='/cart'>
              <img src={assets.basket_icon} alt="Cart icon" className="cart-icon" />
              {getTotalCartAmount() > 0 && <div className="dot"></div>}
            </Link>
          </div>
          {!token? <button onClick={() => setShowLogin(true)}>Sign in</button> 
          : <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>

          </div> }
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
