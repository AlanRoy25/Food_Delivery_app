import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    setCartItems((prevCart) => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1, //increment the item quantity or add it with the exisiting one
    }));
  };

  const removeCart = (itemId) => {
    setCartItems((prevCart) => {
      const newCart = { ...prevCart };

      if (newCart[itemId] === 1) {
        delete newCart[itemId]; // remove the item if the quantity is 1
      } else {
        newCart[itemId] -= 1; //Otherwise, decrement its quantity
      }

      return newCart;
    });
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeCart,
  };

  useEffect(() => {
    // effect to handle the cart updates (eg. saving to local storage)
  }, [cartItems]);
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
