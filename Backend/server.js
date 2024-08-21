import express from "express"
import cors from 'cors'
import { connectdb } from "./config/db.js";
import FoodRouter from "./routes/foodroute.js";
import 'dotenv/config'
import userRouter from "./routes/userRoutes.js";

// app config

const app = express();
const port = 4000

//middlewares

app.use(express.json())
app.use(cors())

// db connection

connectdb()

// api endpoint

app.use('/api/food', FoodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)


app.get('/' ,(req,res) => {
  res.send('Api working')
})

app.listen(port, ()=> {
  console.log(`Server Started on https://localhost:${port}`);
  
})

//mongodb+srv://alanroy:Qazwsxedc0225!@delivery-app.lvrbx.mongodb.net/