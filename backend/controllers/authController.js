import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { secret } from "../config/jwt.js";
import { expressjwt } from "express-jwt";
import { comparePassword, hashPassword } from '../utils/Auth.js';

export const signup = (req, res) => {
    const { name, email, password } = req.body;

    //validation
    if (!name) return res.status(400).send('Name is required');
    if (!password || password.length < 6) {
        return res.status(400).send('Password is required and should be min 6 characters long');
    }
    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).send('Email is taken');
        }
    });

    //hash password
    const hashedPassword = hashPassword(password);

    //register
    const user = new User({
        name,
        email,
        password: hashedPassword,
    });

    user.save((err, user) => {
        if (err) {
            console.log('Save error', errorHandler(err));
            return res.status(401).send('Error. Try again');
        }
        return res.json({
            ok: true,
        });
    });
}

export const login = (req, res) => {
    const { email, password } = req.body;
    //check if user exist in our db
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: 'User with that email does not exist. Please register.'
            });
        }
        //authenticate
        if (!comparePassword(password, user.password)) {
            return res.status(400).json({
                err: 'Email and password do not match.'
            });
        }
        //generate a token and send to client
        const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '7d' });
        const { _id, name, email} = user;

        return res.json({
            token,
            user: { _id, name, email},
        });
    });
}

// export const requireSignin = expressjwt({
//     secret,
//     algorithms: ['HS256'],
// });



    