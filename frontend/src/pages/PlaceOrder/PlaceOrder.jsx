import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { loadStripe } from '@stripe/stripe-js';
import './PlaceOrder.css';

const stripePromise = loadStripe('pk_live_51Pv1McRtWX4ePa0jff2xOpAqkcvHzKG7ASg6j3rtJFkJ25e8YlVZwXXDSedq20G9Y6tcRDPhsDi70zXtVdQy7UDQ00ob3TCYlH');

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodList, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    // Ensure foodList is an array
    if (Array.isArray(foodList)) {
      foodList.forEach((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item, quantity: cartItems[item._id] };
          orderItems.push(itemInfo);
        }
      });
    } else {
      console.error('foodList is not an array or is undefined');
      return; // Exit if foodList is invalid
    }

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 60,
    };

    try {
      let response = await axios.post(`${url}/api/order/create-checkout-session`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const { sessionId } = response.data;
        const stripe = await stripePromise; // Use preloaded Stripe instance
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.error('Error redirecting to checkout:', error);
        }
      } else {
        alert('Error placing order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input
            required
            name='firstname'
            onChange={onChangeHandler}
            value={data.firstname}
            type='text'
            placeholder='First Name'
          />
          <input
            required
            name='lastname'
            onChange={onChangeHandler}
            value={data.lastname}
            type='text'
            placeholder='Last Name'
          />
        </div>
        <input
          required
          name='email'
          onChange={onChangeHandler}
          value={data.email}
          type='email'
          placeholder='Email Address'
        />
        <input
          required
          name='street'
          onChange={onChangeHandler}
          value={data.street}
          type='text'
          placeholder='Street'
        />
        <div className='multi-fields'>
          <input
            required
            name='city'
            onChange={onChangeHandler}
            value={data.city}
            type='text'
            placeholder='City'
          />
          <input
            required
            name='state'
            onChange={onChangeHandler}
            value={data.state}
            type='text'
            placeholder='State'
          />
        </div>
        <div className='multi-fields'>
          <input
            required
            name='zipcode'
            onChange={onChangeHandler}
            value={data.zipcode}
            type='text'
            placeholder='Zip Code'
          />
          <input
            required
            name='country'
            onChange={onChangeHandler}
            value={data.country}
            type='text'
            placeholder='Country'
          />
        </div>
        <input
          required
          name='phone'
          onChange={onChangeHandler}
          value={data.phone}
          type='number'
          placeholder='Phone No'
        />
      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>Rs {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>Rs {getTotalCartAmount() === 0 ? 0 : 60}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Total</p>
              <b>Rs {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 60}</b>
            </div>
          </div>
          <button type='submit'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
