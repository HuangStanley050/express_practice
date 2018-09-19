var express = require('express');
var router = express.Router();
let Article = require("../models/articles");


router.get('/', (req, res, next) => {

    let articles = [];

    Article.find({}, (err, result) => {
        if (err) {
            console.log(err);
        }
        articles = result;
        //console.log(articles);
        res.render('articles', { articles: articles });
    });

});



router.get("/:id", (req, res) => {
    Article.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            res.render("article", { data: data });
        }
    });
});



module.exports = router;
