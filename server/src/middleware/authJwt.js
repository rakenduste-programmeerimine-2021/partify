const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;


//https://www.bezkoder.com/node-js-mongodb-auth-jwt/

// Checks if the token provided is valid
verifyToken = (req, res, next) => {
    // console.log(req.headers)
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

// Checks if user has admin role
isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId).populate("roles")
    if (!user) res.status(404).send("User not found")
    for (let i = 0; i < user.roles.length; i++) {
        if (user.roles[i].name === "admin") {
            next();
            return;
        }
    }
    res.status(403).send({
        message: "Require Admin Role!"
    });
}



const authJwt = {
    verifyToken,
    isAdmin
};
module.exports = authJwt;