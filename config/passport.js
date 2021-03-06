const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const config = require("../config/database");
const bcrypt = require("bcryptjs");

module.exports = (passport) => {
    passport.use(new LocalStrategy((username, password, done) => {
        let query = { username: username };
        User.findOne(query, (err, user) => {
            if (err) throw err;
            if (!user) {
                return done(null, false, "User not found");
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) { console.log(err); }
                if (isMatch) { return done(null, user); }
                else {
                    return done(null, false, "Password not right");
                }
            });
        });


    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
