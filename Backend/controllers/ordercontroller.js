import express from 'express';
import Stripe from 'stripe';
import orderModel from '../models/ordermodel.js';
import userModel from '../models/usermodel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

const createCheckoutSession = async (req, res) => {
  const frontend_url = "http://localhost:5174"; 

  try {
    const { userId, items, amount, address } = req.body;

    // Create a new order in the database
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      status: 'Pending',
    });
    await newOrder.save();
    
    // Clear the user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Create line items for Stripe Checkout
    const line_items = items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100 * 83.96), // Convert to the smallest currency unit
      },
      quantity: item.quantity,
    }));

    // Add delivery charges as a separate line item
    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: Math.round(60 * 100 * 83.96), // Convert to the smallest currency unit
      },
      quantity: 1, // Delivery charge is typically a single item
    });

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ success: false, message: 'Payment Failed, Please try again' });
  }
};



export default {createCheckoutSession};
