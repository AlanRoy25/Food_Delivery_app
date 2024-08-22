import express from 'express'
import { signupuser, loginuser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/signin', signupuser)
userRouter.post('/login', loginuser)


export default userRouter;