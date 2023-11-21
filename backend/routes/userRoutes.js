import express  from "express";

import { currentUser, updateInfo } from "../controllers/userController.js";
import { requireSignin } from "../middlewares/index.js";

const router = express.Router();

router.get('/details', requireSignin, currentUser);
router.post('/update', updateInfo);


export default router;