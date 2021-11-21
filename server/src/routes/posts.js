const router = require('express').Router()
const postController = require('../controllers/postController')
const multer  = require('multer')
const validationMiddleware = require("../middleware/validationMiddleware")
const {check} = require('express-validator')

const uploadFile = multer({ dest: './uploads/',
    limits: {
        fileSize: 100000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toUpperCase().match(/\.(PNG|JPG|SVG|GIF|MPG|MOV|WMV|RM|MP4|MKV|AVI)$/)) { 
            return cb(new Error('Bad file type'))
        }
    cb(undefined, true)
}})

router.get('/', postController.getPosts)
router.get('/:id', postController.getOnePost)
router.put('/like/:id', postController.likePost)
router.put('/dislike/:id', postController.dislikePost)
router.delete('/delete/:id', postController.deletePost)
router.put('/edit/:id', postController.updatePost)
router.post('/create', uploadFile.single('postFile'), postController.createPost)



module.exports = router