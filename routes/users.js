var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const { body, check, validationResult } = require('express-validator/check');
let User = require("../models/user");

// load register form

router.get('/', (req, res, next) => {
    res.render('register');
});

router.get("/login", (req, res) => {
    res.send("Login");
})

router.post("/", [
    check('name').not().isEmpty(),
    check("email").isEmail(),
    check("username").not().isEmpty(),
    check("password").not().isEmpty(),
    body("password2").not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        res.send("Invalid Input");
    }
    else {
        //console.log("success");
        //res.redirect("/articles");
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
            if (err) { console.log(err) }
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) { console.log(err) }
                newUser.password = hash;
                console.log(newUser.password);
                newUser.save((err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    else {
                        req.flash("success", "You have registered");
                        res.redirect("/articles");
                    }
                });
            });
        });
    }
});

module.exports = router;
