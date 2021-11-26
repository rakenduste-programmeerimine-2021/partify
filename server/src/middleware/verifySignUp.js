const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

//https://www.bezkoder.com/node-js-mongodb-auth-jwt/

// Checks if user with provided email or username already exists
verifyUNameEmail = (req, res, next) => {
    // userName
    User.findOne({
        userName: req.body.userName
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        if (user) {
            res.status(400).send({
                message: "This username is already taken!"
            });
            return;
        }

        // Email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({
                    message: err
                });
                return;
            }

            if (user) {
                res.status(400).send({
                    message: "This email is already taken!"
                });
                return;
            }

            next();
        });
    });
};

// Checks if role is valid
verifyRoles = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }

    next();
};


const verifySignUp = {
    verifyUNameEmail,
    verifyRoles
};

module.exports = verifySignUp;