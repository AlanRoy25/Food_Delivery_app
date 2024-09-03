import express from 'express'
import authMiddleware from '../middlewares/auth.js'
import orderController from '../controllers/ordercontroller.js'


const orderRouter = express.Router()

orderRouter.post('/create-checkout-session', authMiddleware, orderController.createCheckoutSession)

export default orderRouter;