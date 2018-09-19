var express = require('express');
var router = express.Router();
let Article = require("../models/articles");

router.get('/:id', (req, res, next) => {
    Article.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            res.render("edit", { data: data });
        }

    });


});

router.post('/:id', (req, res, next) => {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = { _id: req.params.id };
    console.log(query);
    Article.update(query, article, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/articles");
        }
    });

    //res.send("Update page");

});

module.exports = router;
