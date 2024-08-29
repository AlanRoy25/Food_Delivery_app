import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import usermodel from "../models/usermodel.js";

// Login user
export const loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userexists = await usermodel.findOne({ email: email });
    if (!userexists) {
      return res.json({ success: false, message: "User doesn't exist!" });
    }

    // Checking password
    const ismatch = await bcrypt.compare(password, userexists.password);
    if (!ismatch) {
      return res.json({ success: false, message: "Invalid password!" });
    }

    const token = createToken(userexists._id);  // Use userexists._id
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user
export const signupuser = async (req, res) => {
  const { name, password, email } = req.body;
  // Checking if user already exists
  try {
    const userexists = await usermodel.findOne({ email: email });
    if (userexists) {
      return res.json({ success: false, message: "User already exists" });
    }
    
    // Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Encrypting the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating new user
    const newUser = new usermodel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "An error occurred while creating the user",
    });
  }
};
