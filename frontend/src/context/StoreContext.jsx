import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const url = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [token,setToken] = useState('')
  const [foodList, setFoodList] = useState([])


  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    }
    loadData();
  }, []);

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

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = foodList.find(
          (product) => product._id.toString() === item
        );
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
  }
    return totalAmount;
  };

  const contextValue = {
    foodList,
    cartItems,
    addToCart,
    removeCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
