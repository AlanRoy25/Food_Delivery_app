import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, url, images }) => {
  const { cartItems, addToCart, removeCart } = useContext(StoreContext);

  console.log('URL in FoodItem:', url);
  console.log('Images in FoodItem:', images);

  const itemQuantity = cartItems[id] || 0;
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={`${url}/uploads/${images}`} alt='' />
        {itemQuantity === 0 ? (
          <img
            onClick={() => addToCart(id)}
            src={assets.add_icon_green}
            alt="Add"
            className="add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{itemQuantity}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price"> Rs {price}/-</p>
      </div>
    </div>
  );
};


export default FoodItem;
