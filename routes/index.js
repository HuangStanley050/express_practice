var express = require('express');
var router = express.Router();
let Article = require("../models/articles");

/* GET home page. */
router.get('/', (req, res, next) => {
    Article.find({}, (error, articles) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(articles);
        }
    });
    res.render('index', { title: 'Express' });
});

module.exports = router;
