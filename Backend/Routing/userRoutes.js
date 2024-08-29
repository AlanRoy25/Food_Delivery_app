import express from 'express'
import { signupuser, loginuser } from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.post('/signin', signupuser)

userRoutes.post('/login', loginuser)


export default userRoutes;