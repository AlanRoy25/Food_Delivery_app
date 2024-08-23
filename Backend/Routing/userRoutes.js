import express from 'express'
import { signupuser, loginuser } from '../controllers/userController.js'

const router = express.Router()

router.post('/signin', signupuser)

router.post('/login', loginuser)


export default router;