const db = require("../models");
const Post = db.post;
const Comment = db.comment;
const {
    authJwt
} = require("../middleware");

exports.getComments = async function (req, res) {
    try {
        const comments = await Comment.find({})
        res.status(200).send(comments)
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}

// Gets one comment with given id
exports.getOneComment = async (req, res) => {
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            const comment = await Comment.findById(req.params.id).populate({
                    path: "user",
                    select: "-gender -dateOfBirth -phone -email -createdAt -updatedAt -__v -posts"
                }
            )
            if (!comment) res.status(404).send("No comment with that id found")
            else res.status(200).send(comment)
        } else {
            res.status(400).send("Comment not found!")
        }
    } catch (e) {
        res.status(500)
    }

}


exports.addComment = async function (req, res) {
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            var id = req.params.id
            const userId = req.userId
            const post = await Post.findById(id)
            if (!post) {
                res.status(400).send("Post not found!")
                return
            }
            const newComment = {
                user: userId,
                post: id,
                body: req.body.body
            }
            const addNewComment = new Comment(newComment)
            addNewComment.save(async function (err, result) {
                if (err) {
                    console.log(err)
                    res.status(400).send(`error ${err}`)
                    return
                }
                if (result) {
                    try {
                        const postComments = await Comment.find({
                            post: id
                        }, {
                            '_id': 1
                        })
                        if (postComments.length > 0) {
                            const commentsInPost = []
                            for (let i = 0; i < postComments.length; i++) {
                                commentsInPost.push(postComments[i]._id)
                            }
                            const post = await Post.findByIdAndUpdate(id, {
                                "comments": commentsInPost
                            })
                        }
                    } catch (e) {
                        console.log(e)
                        res.status(500)
                        return
                    }
                }
            })
            res.status(200).send("Comment saved!")
            return
        } else {
            res.status(400).send("Comment not found")
            return
        }
    } catch (e) {
        console.log(e)
        res.status(500)
        return
    }
}

exports.addReply = async function (req, res) {
    try {
        if (req.params.commentId.match(/^[0-9a-fA-F]{24}$/) && req.params.postId.match(/^[0-9a-fA-F]{24}$/)) {
            var commentId = req.params.commentId
            var postId = req.params.postId
            const userId = req.userId
            const comment = await Comment.findById(commentId)
            if (!comment) {
                res.status(400).send("Comment not found!")
                return
            }
            const newComment = {
                user: userId,
                post: postId,
                parent_id: commentId,
                body: req.body.body
            }
            const addNewComment = new Comment(newComment)
            addNewComment.save(async function (err, result) {
                if (err) {
                    console.log(err)
                    res.status(400).send(`error ${err}`)
                    return
                }
                if (result) {
                    try {
                        const postComments = await Comment.find({
                            post: postId
                        }, {
                            '_id': 1
                        })
                        if (postComments.length > 0) {
                            const commentsInPost = []
                            for (let i = 0; i < postComments.length; i++) {
                                commentsInPost.push(postComments[i]._id)
                            }
                            const post = await Post.findByIdAndUpdate(postId, {
                                "comments": commentsInPost
                            })
                        }
                    } catch (e) {
                        console.log(e)
                        res.status(500)
                        return
                    }

                }
            })
            res.status(200).send("Reply saved!")
            return
        } else {
            res.status(400).send("Comment not found")
            return
        }
    } catch (e) {
        console.log(e)
        res.status(500)
        return
    }
}

// Deletes comment from db when the user is the comments author or admin
exports.deleteComment = async (req, res) => {
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            var id = req.params.id
            const comment = await Comment.findById(id)
            const hasAdmin = await authJwt.isUserAdminBool(req.userId)
            if (!comment) {
                res.status(404).send("No comment with that id found")
                return
            }

            if (comment.user.toString() === req.userId || hasAdmin) {
                if (!comment) res.status(404).send("No comment with that id found")
                else {
                    try {
                        comment.delete();
                        res.status(200).send("Comment deleted")
                    } catch (e) {
                        res.status(500).send(e)
                    }
                }
            } else {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
        } else {
            res.status(400).send("Comment not found!")
        }
    } catch (e) {
        return res.status(500).send(e)
    }

}
