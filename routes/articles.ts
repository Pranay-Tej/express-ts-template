import express from 'express';
import Article from '../models/Article'

const router = express.Router();


// GET ALL POSTS

// router.get("/", (req, res) => {
//     Article.find()
//         .then((data) => res.json(data))
//         .catch((err) => res.json({ message: err }));
// });

router.get("/", async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// GET SPECIFIC POST
router.get("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            throw "Article not found!";
        }
        res.json(article);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// POST

// router.post("/", (req, res) => {
//     const article = new Article(req.body);
//     article.save().then(data => {
//         res.json(data)
//     }).catch(err => {
//         res.status(404).json({message: err})
//     })
// });

router.post("/", async (req, res) => {
    const article = new Article(req.body);

    try {
        const savedArticle = await article.save();
        res.json(savedArticle);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// UPDATE SPECIFIC POST
router.put("/:id", async (req, res) => {
    try {
        const updatedArticle = await Article.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );

        if (updatedArticle.n == 0) {
            throw "Article not found!";
        }
        const article = await Article.findById(req.params.id)
        res.json(article);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

// DELETE SPECIFIC POST
router.delete("/:id", async (req, res) => {
    try {
        const removedArticle = await Article.deleteOne({ _id: req.params.id });
        if (removedArticle.deletedCount == 0) {
            throw "Article not found!";
        }
        res.json(removedArticle);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

export default router;

