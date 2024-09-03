import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  address: { type: Object, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false }
});

console.log("Registering Order model...");

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
