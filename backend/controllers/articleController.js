import Article from "../models/Article.js";

// Create new article
export const createArticle = async (req, res) => {
  try {
    //console.log("req body",req.body);
    const { title, content } = req.body;
    const article = await new Article({ title, content }).save();
    //console.log("CURRENT USER", user);
    return res.json(article);
  } catch (error) {
    console.log("ERROR LENA", error);
  }
};

// Fetch all articles
export const getArticles = async (req, res) => {
  try {
    //console.log("req body",req.body);
    const articles = await Article.find({}).exec();
    //console.log("CURRENT USER", user);
    return res.json(articles);
  } catch (error) {
    console.log("ERROR LENA", error);
  }
};

// Update article
export const updateArticle = async (req, res) => {
    console.log(req.params);
    const article = await Article.findById(req.params.id);
    const { title, content } = req.body;
    if (article) {
      article.title = title;
      article.content = content;
      const updatedArticle = await article.save();
      res.json(updatedArticle);
    } else {
      res.status(404);
      throw new Error("Article not found");
    }
}

// Delete article
export const deleteArticle = async (req, res) => {
    try{
        const article = await Article.findById(req.params.id);
        if(article){
            await article.deleteOne();
            res.json({message: "Article deleted"});
        } else {
            res.status(404);
            throw new Error("Article not found");
        }
    } catch (error) {
        console.log(error);
    }
}

// export const getArticleByTitle = async (req, res) => {
//     try{
//         console.log(req.params);
//         const article = await Article.findOne({title: req.params.title});
//         if(article){
//             res.json(article);
//         } else {
//             res.status(404);
//             throw new Error("Article not found");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }