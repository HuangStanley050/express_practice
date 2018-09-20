var express = require('express');
var router = express.Router();
//const bcrypt = require("bcryptjs");


router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", (req, res) => {
    res.send("Post Login request");
})

module.exports = router;
