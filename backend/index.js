import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";


const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connecté à la base de données MongoDB');
});


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
// app.use('/api/post', postRoutes);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
  }
);


