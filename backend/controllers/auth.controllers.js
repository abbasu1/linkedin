import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  try {
    let { firstName, lastName, userName, email, password } = req.body;

    // Await the queries!
    let existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "User already exists" });
    }

    let existUsername = await User.findOne({ userName });
    if (existUsername) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });

    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res
      .status(201)
      .json({ message: "User created successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong server error", error: error.message });
  }
};
export const login = async(req, res) => {
  try{
      let {email, password } = req.body;

    // Await the queries!
    let existEmail = await User.findOne({ email });
    if (!existEmail) {
      return res.status(400).json({ message: "User does not exist" });
    }

  
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const isMatch = await bcrypt.compare(password, existEmail.password);
    if(!isMatch){
      return res.status(400).json({ message: "Invalid credentials" });
    }

    

    let token = await genToken(existEmail._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res
      .status(200)
      .json({ message: "User login successfully", User });
  }
  catch(error){
    return res
      .status(500)
      .json({ message: "Something went wrong server error", error: error.message });
    
  }
}
export const logout= async(req,res)=>{
  try{
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({message:"Logged out successfully"});
  }
  catch(error){
    return res
      .status(500)
      .json({ message: "Something went wrong server error", error: error.message });
  }
}
