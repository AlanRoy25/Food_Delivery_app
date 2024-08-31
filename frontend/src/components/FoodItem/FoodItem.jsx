import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, images, url, item }) => {
  const { cartItems, addToCart, removeCart } = useContext(StoreContext);

  const itemQuantity = cartItems[id] || 0;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={`${url}/uploads/${images}`} alt="" />
        {itemQuantity === 0 ? (
          <img
            onClick={() => addToCart(id)}
            src={assets.add_icon_green}
            alt=""
            className="add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{itemQuantity}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price"> Rs {price}/-</p>
      </div>
    </div>
  );
};

export default FoodItem;
