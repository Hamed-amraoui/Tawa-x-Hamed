import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";


const app = express();
const router = express.Router();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connecté à la base de données MongoDB');
});

router.use('/api/auth', authRoutes);
// router.use('/api/users', userRoutes);
// router.use('/api/articles', articleRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
  }
);


