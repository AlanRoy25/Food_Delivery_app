import express from "express"
import { connectdb } from "./config/db.js";
import FoodRouter from "./routes/foodroute.js";
import 'dotenv/config'
import userRouter from "./routes/userRoutes.js";

// app config

const app = express();



//middlewares

app.use(express.json())


// db connection

connectdb()

// api endpoint

app.use('/api/food', FoodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)


app.get('/' ,(req,res) => {
  res.send('Api working')
})

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=> 
  console.log(`Server Started on ${PORT}`));

//mongodb+srv://alanroy:Qazwsxedc0225!@delivery-app.lvrbx.mongodb.net/