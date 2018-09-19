var express = require('express');
var router = express.Router();
const { body, check, validationResult } = require('express-validator/check');
let Article = require("../models/articles");


router.get('/', (req, res, next) => {

    res.render('add');
});

router.post("/", [
    check('title').not().isEmpty(),
    check("author").not().isEmpty(),
    check("body").not().isEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else {
        let article = new Article();
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;

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
    }
});



module.exports = router;
