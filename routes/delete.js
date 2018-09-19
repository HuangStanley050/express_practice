var express = require('express');
var router = express.Router();
let Article = require("../models/articles");

router.delete('/:id', (req, res, next) => {
    let id = { _id: req.params.id };
    Article.deleteOne(id, (err, result) => {
        if (err) {
            throw err;
        }

        res.redirect("/articles");
    });

});

module.exports = router;
