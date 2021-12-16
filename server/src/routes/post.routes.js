const postController = require('../controllers/post.controller')
const votesController = require('../controllers/vote.controller')
const commentController = require('../controllers/comment.controller')
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
        if (!file) {
            return cb(new Error('No file!'))
        }
        // only permit image or video mimetypes
        const image = file.mimetype.startsWith("image");
        const video = file.mimetype.startsWith("video");
        if (image || video) {
            cb(undefined, true)
        } else {
            console.log("file not supported");
            errorReq = true;
            return cb(new Error('Bad file type'))
        }
    },
})

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/post/sort/:type', [authJwt.verifyToken],
        postController.getPosts)
    app.put('/api/post/like/:id', [authJwt.verifyToken],
        votesController.likePost)
    app.put('/api/post/dislike/:id', [authJwt.verifyToken],
        votesController.dislikePost)
    app.get('/api/post/:id', [authJwt.verifyToken],
        postController.getOnePost)
    app.delete('/api/post/delete/:id', [authJwt.verifyToken],
        postController.deletePost)
    app.put('/api/post/edit/:id', [check(["tags", "title", "location"])
        .isString().isLength({
            min: 1,
            max: 96
        }).trim().withMessage("Fields must be between 1 and 96 characters"),
        check(["body"]).isString().isLength({
            min: 1,
            max: 256
        }).trim().withMessage("Body must be between 1 and 256 characters"),
        authJwt.verifyToken
    ], postController.updatePost)
    app.post('/api/post/create', [check(["tags", "title", "location"])
        .isString().isLength({
            min: 1,
            max: 96
        }).trim().withMessage("Fields must be between 1 and 96 characters"),
        check(["body"]).isString().isLength({
            min: 1,
            max: 256
        }).trim().withMessage("Body must be between 1 and 256 characters"),
        authJwt.verifyToken
    ], uploadFile.single('image'), postController.createPost)

    // Post comment routes
    app.get('/api/posts/comment', [authJwt.verifyToken],
        commentController.getComments)
    app.get('/api/post/comments/:id', [authJwt.verifyToken],
        commentController.getOneComment)
    app.post('/api/posts/:id/comment', [check(["body"])
        .isString().isLength({
            min: 1,
            max: 128
        }).trim(), authJwt.verifyToken
    ], commentController.addComment)
    app.post('/api/posts/:postId/reply/:commentId', [check(["body"])
        .isString().isLength({
            min: 1,
            max: 128
        }).trim(), authJwt.verifyToken
    ], commentController.addReply)
    app.put('/api/posts/comment/like/:id', [authJwt.verifyToken],
        votesController.likeComment)
    app.put('/api/posts/comment/dislike/:id', [authJwt.verifyToken],
        votesController.dislikeComment)
    app.delete('/api/posts/comment/delete/:id', [authJwt.verifyToken],
        commentController.deleteComment)
};