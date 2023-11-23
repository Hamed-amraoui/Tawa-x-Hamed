import express from "express";
import { requireSignin } from "../middlewares/index.js";

import { createArticle, 
        getArticles, 
        updateArticle, 
        deleteArticle } from "../controllers/articleController.js";


const router = express.Router();

router.post('/create', requireSignin, createArticle);
router.get('/', requireSignin, getArticles);
// router.get('/:title', requireSignin, getArticleByTitle);
router.put('/update/:id', requireSignin, updateArticle);
router.delete('/delete/:id', requireSignin, deleteArticle);


export default router;

