const postController = require('../controllers/post.controller')
const votesController = require('../controllers/vote.controller')
const multer = require('multer')
const {
    authJwt
} = require("../middleware");
const {
    check
} = require('express-validator')
const validationMiddleware = require("../middleware/validationMiddleware")

const uploadFile = multer({
    
    dest: './uploads/',
    limits: {
        fileSize: 100000000
    },
    fileFilter(req, file, cb) {
        console.log(file)
        if (!file.originalname.toUpperCase().match(/\.(PNG|JPG|SVG|GIF|MPG|MOV|WMV|RM|MP4|MKV|AVI)$/)) {
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

    app.get('/api/post/', [authJwt.verifyToken], postController.getPosts)
    app.get('/api/post/:id', [authJwt.verifyToken], postController.getOnePost)
    app.put('/api/post/like/:id', [authJwt.verifyToken], votesController.likePost)
    app.put('/api/post/dislike/:id', [authJwt.verifyToken], votesController.dislikePost)
    app.delete('/api/post/delete/:id', [authJwt.verifyToken], postController.deletePost)
    app.put('/api/post/edit/:id', [check(["body", "tags", "title", "location"])
    .isString().isLength({
        min: 1
    }).trim(),
        authJwt.verifyToken], postController.updatePost)
    app.post('/api/post/create', [check(["body", "tags", "title", "location"])
    .isString().isLength({
        min: 1
    }).trim(),
        authJwt.verifyToken], uploadFile.single('postFile'), postController.createPost)
};