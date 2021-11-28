const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//https://www.bezkoder.com/node-js-mongodb-auth-jwt/

// Saves new user to db
exports.signup = (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        if (req.body.roles) {
            Role.find({
                    name: {
                        $in: req.body.roles
                    }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({
                            message: err
                        });
                        return;
                    }

                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({
                                message: err
                            });
                            return;
                        }

                        res.send({
                            message: "User was registered successfully!"
                        });
                    });
                }
            );
        } else {
            Role.findOne({
                name: "user"
            }, (err, role) => {
                if (err) {
                    res.status(500).send({
                        message: err
                    });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({
                            message: err
                        });
                        return;
                    }

                    res.send({
                        message: "User was registered successfully!"
                    });
                });
            });
        }
    });
};

// If user with provided email exists, checks if password is valid, then logs in the user/ provides jwtToken
exports.signin = (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({
                    message: err
                });
                return;
            }

            if (!user) {
                return res.status(404).send({
                    message: "User was not found."
                });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET, {
                expiresIn: 86400
            });

            
            res.status(200).send({
                id: user._id,
                userName: user.userName,
                email: user.email,
                roles: user.roles,
                accessToken: token
            });
        });
};