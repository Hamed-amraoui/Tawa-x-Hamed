import { expressjwt } from "express-jwt";
import dotenv from "dotenv";
dotenv.config();

export const requireSignin = expressjwt({
    getToken: (req) => req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});