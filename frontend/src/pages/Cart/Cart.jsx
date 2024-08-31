import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const CartItem = ( name, item, quantity, removeCart, url , price ) => (
  <>
    <div className="cart-items-title cart-items-item">
      <img src={`${url}/uploads/${image}`}
 alt={item.name} />
      <p>{item.name}</p>
      <p>Rs {item.price}</p>
      <p>{quantity}</p>
      <p>Rs {item.price * quantity}</p>
      <p onClick={() => removeCart(item._id)} className="cross">
        x
      </p>
    </div>
    <hr />
  </>
);

const Cart = () => {
  const { cartItems, foodList, removeCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const deliveryFee = 2;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map((item) => {
          const quantity = cartItems[item._id];
          if (quantity > 0) {
            return (
              <CartItem
                key={item._id}
                item={item}
                quantity={quantity}
                removeCart={removeCart}
                url={url}
              />
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs {getTotalCartAmount() === 0 ? 0 : deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>Rs {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryFee}</b>
            </div>
          </div>
          <button onClick={() => navigate('/orders')}>Proceed to Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Enter promo code</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
