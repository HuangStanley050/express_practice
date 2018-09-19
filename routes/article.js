var express = require('express');
var router = express.Router();
let Article = require("../models/articles");


router.get('/', (req, res, next) => {

    res.render('add');
});

router.post("/", (req, res, next) => {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    //res.send("Post route");
    article.save(err => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            req.flash("success", "Article added");
            res.redirect("/articles");
        }
    });
});

module.exports = router;
