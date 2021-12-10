const db = require("../models");
const User = db.user;
const Post = db.post;
var fs = require('fs')
const {
    authJwt
} = require("../middleware");


// Creates new post in db and saves user file to uploads dir
exports.createPost = async function (req, res) {
    try {
        if (req.file) {
            const originalName = req.file.originalname
            const fileExtension = originalName.split('.').pop()
            const filePath = req.file.path
            const fullFileName = filePath + '.' + fileExtension;
            // Adds file extension to saved file.
            fs.readFile(req.file.path, (err, contents) => {
                if (err) {
                    console.log('Error: ', err);
                } else {
                    fs.rename(filePath, fullFileName, (err) => {
                        if (err) throw err;
                    });
                }
            });

            // Should be unnecessary but sometimes multer detects mimetype as form-data not image/video
            const imageTypes = ['PNG', 'JPG', 'SVG', 'GIF']
            const videoTypes = ['MPG', 'MOV', 'WMV', 'RM', 'MP4', 'MKV', 'AVI']
            if (imageTypes.includes(fileExtension.toUpperCase())) {
                var postMediaType = "Image"
            } else if (videoTypes.includes(fileExtension.toUpperCase())) {
                var postMediaType = "Video"
            } else {
                var postMediaType = "None"
                return
            }

            const stringTags = req.body.tags
            const splitTags = stringTags.split(',');
            const userId = req.userId
            if (userId.match(/^[0-9a-fA-F]{24}$/)) {

                const newPost = {
                    body: req.body.body,
                    postMediaType: postMediaType,
                    postMediaName: fullFileName,
                    title: req.body.title,
                    location: req.body.location,
                    tags: splitTags,
                    user: userId,
                    isEvent: req.body.isEvent
                }
                const createdPost = new Post(newPost)
                createdPost.save(async function (err, result) {
                    if (err) {
                        console.log(err)
                        res.status(400).send(`error ${err}`)
                        return
                    }
                    if (result) {
                        try {
                            const postByUser = await Post.find({
                                user: userId
                            }, {
                                '_id': 1
                            })
                            if (postByUser.length > 0) {
                                const userPosts = []
                                for (let i = 0; i < postByUser.length; i++) {
                                    userPosts.push(postByUser[i]._id)
                                }
                                const user = await User.findByIdAndUpdate(userId, {
                                    "posts": userPosts
                                })
                            }
                        } catch (e) {
                            res.status(500)
                            return
                        }
                        res.status(200).send("Post saved!")
                        return
                    }
                })
            } else {
                res.status(400).send("User not found!")
                return
            }
        } else {
            res.status(400).send(`No file attached!`)
            return
        }
    } catch (e) {
        res.status(500)
        return
    }


};


// Gets one post with given id
exports.getOnePost = async (req, res) => {
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            const post = await Post.findById(req.params.id).populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "-gender -dateOfBirth -phone -email -createdAt -updatedAt -__v -posts"
                }
            }).populate({
                    path: "user",
                    select: "-gender -dateOfBirth -phone -email -createdAt -updatedAt -__v -posts"
                }

            )
            if (!post) res.status(404).send("No post with that id found")
            else res.status(200).send(post)
        } else {
            res.status(400).send("Post not found!")
        }
    } catch (e) {
        res.status(500)
    }

}


// Gets all the posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate("user",
            '-password -gender -dateOfBirth -phone -email -createdAt -updatedAt -__v')
        if (!posts) res.status(404).send("No posts found")
        else res.status(200).send(posts)
    } catch (e) {
        res.status(500)
    }

}


// Updates post when the user is the posts author or admin
exports.updatePost = async (req, res) => {
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            var id = req.params.id
            const stringTags = req.body.tags
            var splitTags = stringTags.split(',')
            const oldPost = await Post.findById(id)
            var hasAdmin = await authJwt.isUserAdminBool(req.userId)
            if (!oldPost) res.status(404).send("No post with that id found")
            if (oldPost.user.toString() === req.userId || hasAdmin) {
                if (req.body.body.length == 0 || req.body.title.length == 0 ||
                    req.body.location.length == 0) res.status(400).send("Fields can't be empty!")
                const newPost = {
                    body: req.body.body,
                    title: req.body.title,
                    tags: splitTags,
                    location: req.body.location,
                }
                const updatedPost = await Post.findByIdAndUpdate(id, newPost)
                res.status(200).send('Post updated!')
            } else {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
        } else {
            res.status(400).send("Post not found!")
        }
    } catch (e) {
        res.status(500)
    }

}

// Deletes post from db and removes post file when the user is the posts author or admin
exports.deletePost = async (req, res) => {
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            var id = req.params.id
            const post = await Post.findById(id)
            const hasAdmin = await authJwt.isUserAdminBool(req.userId)
            if (!post) res.status(404).send("No post with that id found")
            if (post.user.toString() === req.userId || hasAdmin) {
                if (!post) res.status(404).send("No post with that id found")
                else {
                    console.log(post.postMediaName)
                    try {
                        fs.unlink(post.postMediaName, function (err) {
                            if (err) console.log("file not found")
                            post.delete();
                            console.log('File deleted!');
                            res.status(200).send("post deleted")
                        });
                    } catch (e) {
                        res.status(500)
                    }

                }
            } else {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
        } else {
            res.status(400).send("Post not found!")
        }
    } catch (e) {
        return res.status(500)
    }

}

