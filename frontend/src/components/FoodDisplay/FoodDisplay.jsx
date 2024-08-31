import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);

  return (
    <div className="food-display " id="food-display">
      <hr />
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
        {foodList.map((item, index) => {
          console.log(category, item.category);
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                images={item.images}
                url={item.url}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
