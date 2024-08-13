import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({setMenu}) => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes.
        </p>
      <Link to="/#explore-menu" onClick={() => setMenu('menu')}>
      <button>View Menu</button>
      </Link>
      </div>
    </div>
  );
};

export default Header;
