const {
    authJwt
} = require("../middleware");
const userController = require("../controllers/user.controller");
const multer = require('multer')
const {
    check
} = require('express-validator')
const validationMiddleware = require("../middleware/validationMiddleware")

const uploadFile = multer({

    dest: './uploads/avatar/',
    limits: {
        fileSize: 100000000
    },
    fileFilter(req, file, cb) {
        console.log(file)
        if (!file.originalname.toUpperCase().match(/\.(PNG|JPG|SVG)$/)) {
            return cb(new Error('Bad file type'))
        }
        cb(undefined, true)
    }
})

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/user/:id", [authJwt.verifyToken], userController.userProfile);
    app.put("/api/user/:id/update", [
        check(["firstName", "userName", "lastName"]).isLength({
            min: 1
        })
        .withMessage("Name be at least 1 char long")
        .trim()
        .exists()
        .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
        .escape()
        .withMessage("Name must be alphabetic"),
        check("phone")
        .isMobilePhone(), authJwt.verifyToken
    ], validationMiddleware, userController.updateUser);
    app.put("/api/user/:id/update/avatar", [authJwt.verifyToken],
        uploadFile.single('postFile'), userController.updateUserAvatar);
    app.delete("/api/user/:id/delete", [authJwt.verifyToken], userController.deleteUser);
    app.get(
        "/api/users/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        userController.adminBoard
    );
};