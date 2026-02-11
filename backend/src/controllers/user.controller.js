
import {User} from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../config/jwt.js";

const registerUser = async (req, res) => {
    try {
        const {username,password,email} = req.body;

        //basic validation
        if(!username || !password || !email){
            return res.status(400).json({message:"All fields are required"});
        }

        //check if user already exists
        const existing = await User.findOne({$or:[{username},{email}]});
        if(existing){
            return res.status(409).json({message:"User with given username or email already exists"});
        }

        //create user
        const user = await User.create({
                username,
                email:email.toLowerCase(),
                password,
                loggedIn:false,
        });

        

        res.status(201).json({message:"User registered successfully", user:{_id:user._id, username:user.username, email:user.email} });


    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}


const loginUser = async (req, res) => {
    try {
        const {email,password} = req.body;
        //basic validation
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        //check if user exists
        const user = await User.findOne({email:email.toLowerCase()});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        //compare password
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        //if login is successful, update loggedIn status
        user.loggedIn = true;
        await user.save();

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.status(200).json({message:"Login successful", user:{_id:user._id, username:user.username, email:user.email, loggedIn:user.loggedIn, accessToken, refreshToken} });

    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Reset login state and clear refresh token
    user.loggedIn = false;
    user.refreshToken = null;
    await user.save();

    // res.clearCookie('refreshToken'); // if you’re using cookies

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




export {registerUser, loginUser, logoutUser};