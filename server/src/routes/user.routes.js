const {
    authJwt
} = require("../middleware");
const userController = require("../controllers/user.controller");
const votesController = require("../controllers/vote.controller");
const multer = require("multer");
const {
    check
} = require("express-validator");
const validationMiddleware = require("../middleware/validationMiddleware");

const uploadFile = multer({
    dest: "./uploads/avatar/",
    limits: {
        fileSize: 100000000,
    },
    fileFilter(req, file, cb) {
        if (!file) {
            return cb(new Error('No file!'))
        }
        // only permit image mimetypes
        const image = file.mimetype.startsWith("image");
        if (image) {
            cb(undefined, true)
        } else {
            console.log("file not supported");
            errorReq = true;
            return cb(new Error('Bad file type'))
        }
    },
});

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/user/:id", [authJwt.verifyToken], userController.userProfile);
    app.put(
        "/api/user/:id/update",
        [
            check(["firstName", "lastName"])
            .isLength({
                min: 1,
                max: 64,
            })
            .withMessage("Name must be between 1 and 64 characters")
            .trim()
            .exists()
            .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
            .escape()
            .withMessage("Name must be alphabetic"),
            check("phone").isMobilePhone().withMessage("Phone must be a number"),
            check("userName")
            .trim()
            .exists()
            .escape()
            .isLength({
                min: 1,
                max: 32,
            })
            .withMessage("Name must be between 1 and 32 characters"),
            check("email")
            .isEmail()
            .normalizeEmail()
            .escape()
            .withMessage("Must be correctly formatted e-mail"),
            authJwt.verifyToken,
        ],
        validationMiddleware,
        userController.updateUser
    );
    app.put(
        "/api/user/:id/update/avatar",
        [authJwt.verifyToken],
        uploadFile.single("image"),
        userController.updateUserAvatar
    );
    app.delete(
        "/api/user/:id/delete",
        [authJwt.verifyToken],
        userController.deleteUser
    );
    app.get(
        "/api/users/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        userController.adminBoard
    );
    app.put(
        "/api/user/like/:id",
        [authJwt.verifyToken],
        votesController.likeUser
    );
    app.put(
        "/api/user/dislike/:id",
        [authJwt.verifyToken],
        votesController.dislikeUser
    );
};