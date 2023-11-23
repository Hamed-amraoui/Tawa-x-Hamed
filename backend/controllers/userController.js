import User from "../models/User.js";
import { comparePassword, hashPassword } from '../utils/Auth.js';


   //Fetch User Data
export const currentUser = async (req, res) => {
  try {
      //console.log("req body",req.body);
      const user = await User.findById(req.body._id).select("-password").exec();
      //console.log("CURRENT USER", user);
      return res.json(user);
  } catch (error) {
      console.log("ERROR LENA",error);
  }
};


// Update user profile
export const updateInfo = async (req, res) => {
  try {
      //console.log("req body",req.body);
      const {name, password} = req.body;
      const hashedPassword = await hashPassword(password);
      await User.findByIdAndUpdate(req.body._id, {name, password: hashedPassword}, {new: true}).exec();
      return res.json({ok: true});
  } catch (error) {
      console.log("ERROR",error);
  }
};



