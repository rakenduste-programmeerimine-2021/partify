const router = require('express').Router()
const postController = require('../controllers/postController')

router.get('/', postController.getPosts)
router.get('/:id', postController.getOnePost)
router.put('/like', postController.likePost)
router.put('/dislike', postController.dislikePost)
router.delete('/delete/:id', postController.deletePost)
router.put('/edit/:id', postController.updatePost) 



module.exports = router