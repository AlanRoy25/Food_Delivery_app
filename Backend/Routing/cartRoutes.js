import express from 'express'
import { addtoCart,removeFromCart,getCart } from '../controllers/cartcontroller.js'
import authMiddleware from '../middlewares/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware ,addtoCart)
cartRouter.post('/remove',authMiddleware , removeFromCart)
cartRouter.post('/get',authMiddleware , getCart)

export default cartRouter