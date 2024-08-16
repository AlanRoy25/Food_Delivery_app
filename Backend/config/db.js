import mongoose from "mongoose";

 export const connectdb = async() => {
  await mongoose.connect('mongodb+srv://alanroy:Qazwsxedc0225!@delivery-app.lvrbx.mongodb.net/Delivery-app').then(()=>console.log('DB Connected'));

}