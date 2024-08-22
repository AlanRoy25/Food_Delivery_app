import express from 'express'
import { signupuser, loginuser } from '../controllers/userController.js'

const UserRouter = express.Router()

UserRouter.post('/signin', signupuser)
UserRouter.post('/login', loginuser)


export default UserRouter;