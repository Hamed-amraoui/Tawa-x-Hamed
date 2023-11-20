import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { comparePassword, hashPassword } from '../utils/Auth.js';

export const signup = async(req, res) => {
try {
    const {name, email, password} = req.body;
    console.log(req.body);
    //validation
    if (!name) {
        return res.status(400).send("Name is required");
    }
    if (!password || password.length < 7) {
        return res
        .status(400)
        .send("Password is required and should be min 7 characters long");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) {
        return res.status(400).send("Email is taken");
    }
    //hash password
    const hashedPassword = await hashPassword(password);
    // register
    const user = new User({
        name, 
        email, 
        password: hashedPassword,
    });
    await user.save();
    console.log("Saved User", user);
    return res.json({
        ok: true,
    });
} catch (error) {
    console.log(error);
    return res.status(400).send('Error. Try again.');
}
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        //check if our db has user with that email
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(400).send("No user found");
        }
        //check password
        const match = await comparePassword(password, user.password);
        //create signed jwt
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        //return user and token to client, exclude hashed password
        user.password = undefined;
        //send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true, //only works on https
        });
        //send user as json response
        res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error. Try again.");
    }
}




// export const logout = async(req, res) => {
//     try {
//         res.clearCookie("token");
//         return res.json({message: "Signout success"});
//     } catch (error) {
//         console.log(error);
//     }
// }



    