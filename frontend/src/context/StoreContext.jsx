import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {;
  
  const storedCartItems = localStorage.getItem('cartItems')
  return storedCartItems ? JSON.parse(storedCartItems) : {};
})

const url = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [token, setToken] = useState('');
  const [foodList, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Failed to load cart data", error);
    }
  };

  
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem('token');
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};

      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
      
      if (storedCartItems) {
        setCartItems(storedCartItems);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  const addToCart = async (itemId) => {
    try {
      if (token) {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      }

      setCartItems((prevCart) => {
        const newCart = { ...prevCart };
        newCart[itemId] = (prevCart[itemId] || 0) + 1; // Increment the item quantity
        return newCart;
      });
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  const removeCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1
    }));
    if (token) {
      await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
    }
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
