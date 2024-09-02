import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img className='logo' src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias reprehenderit totam repudiandae voluptatibus!</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
          
        </div>
        <div className="footer-content-right">
          <h2>Company</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-content-center">
            <h2>Get In Touch</h2>
            <ul>
              <li>+1-145-451-457</li>
              <li>contact@cravecourier.com</li>
            </ul>
          </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright  2024 © CraveCourier.com</p>
    </div>
  )
}

export default Footer