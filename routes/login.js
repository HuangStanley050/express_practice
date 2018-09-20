var express = require('express');
var router = express.Router();
//const bcrypt = require("bcryptjs");
const passport = require("passport");


router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/user/login",
        failureFlash: true
    })(req, res, next);
    //res.send("Post Login request");
});

router.get("/logout", (req, res, next) => {
    req.logout();
    req.flash("success", "Logout");
    res.redirect("/user/login");
});

module.exports = router;
