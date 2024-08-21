import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import usermodel from "../models/usermodel.js";

export const loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userexists = await usermodel.findOne({ email: email });
    if (!userexists) {
      return res.json({ success: false, message: "User doesnt exists!" });
    }

    //chceking password
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.json({ success: false, message: "Invalid password!" });
    }

    const token = createToken(user._id);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register user

export const signupuser = async (req, res) => {
  const { name, password, email } = req.body;
  //checking if user already exists
  try {
    const userexists = await usermodel.findOne({ email: email });
    if (userexists) {
      return res.json({ success: false, message: "User already exists" });
    }
    //validating email format & strong password
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

    //for encrypting the password we use bycrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user
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
      message: "An error occured while creating the user",
    });
  }
};
