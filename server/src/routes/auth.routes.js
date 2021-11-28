const {
    verifySignUp
} = require("../middleware");
const authController = require("../controllers/auth.controller");
const validationMiddleware = require("../middleware/validationMiddleware")
const date = require('date-and-time')
const {
    check
} = require('express-validator')


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    minDoB = function () {
        const now = new Date();
        const minDateOfBirth = date.addYears(now, -18).toDateString();
        return minDateOfBirth
    }
    oldestDoB = function () {
        const now = new Date();
        const oldestDateOfBirth = date.addYears(now, -120).toDateString();
        return oldestDateOfBirth
    }

    app.post(
        "/api/auth/signup",
        [check("email").isEmail()
            .normalizeEmail()
            .escape()
            .withMessage("Must be correctly formatted e-mail"),
            check(["firstName", "userName", "lastName"]).isLength({
                min: 1
            })
            .withMessage("Name be at least 1 char long")
            .trim()
            .exists()
            .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
            .escape()
            .withMessage("Name must be alphabetic"),
            check('password', 'Password is requried')
            .isLength({
                min: 6
            })
            .custom((val, {
                req,
                loc,
                path
            }) => {
                if (val !== req.body.confirm_password) {
                    throw new Error("Passwords don't match");
                } else {
                    return val;
                }
            }),
            check("phone")
            .isMobilePhone(),
            check("dateOfBirth")
            .isBefore(minDoB())
            .withMessage("Must be at least 18 years old!")
            .isAfter(oldestDoB()),
            verifySignUp.verifyUNameEmail,
            verifySignUp.verifyRoles
        ], validationMiddleware,
        authController.signup
    );

    app.post("/api/auth/signin", [check("email")
        .isEmail()
        .normalizeEmail()
        .escape()
        .withMessage("Must be correctly formatted e-mail")
    ], validationMiddleware, authController.signin);
};