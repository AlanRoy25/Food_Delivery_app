import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: [cartItemSchema], default: [] },
  },
  { minimize: false }
);

// Ensure the model is created only once
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
