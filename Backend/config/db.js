import mongoose from "mongoose";
import 'dotenv/config';

export const connectdb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_SECRET)
      .then(() => console.log("DB Connected"));
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};
