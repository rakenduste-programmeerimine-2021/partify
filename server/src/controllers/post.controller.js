const db = require("../models");
const User = db.user;
const Post = db.post;
const Vote = db.vote;
var fs = require('fs')




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

            const newPost = {
                body: req.body.body,
                postMediaType: postMediaType,
                postMediaName: fullFileName,
                title: req.body.title,
                location: req.body.location,
                tags: splitTags,
                user: req.userId,
            }

            const createdPost = new Post(newPost)
            createdPost.save(function (err, result) {
                if (err) {
                    console.log(err)
                    res.status(400).send(`error ${err}`)
                }
                if (result) {
                    res.status(200).send(`Saved ${createdPost}`)
                }
            })
        } else {
            res.status(400).send(`No file attached!`)
        }
    } catch (e) {
        res.status(500)
    }


};


// Doesn't really need explaining?
exports.getOnePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("user", '-password -gender -dateOfBirth -phone -email -createdAt -updatedAt -__v')
        if (!post) res.status(404).send("No post with that id found")
        else res.status(200).send(post)
    } catch (e) {
        res.status(500)
    }

}


// Doesn't really need explaining?
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate("user", '-password -gender -dateOfBirth -phone -email -createdAt -updatedAt -__v')
        if (!posts) res.status(404).send("No posts found")
        else res.status(200).send(posts)
    } catch (e) {
        res.status(500)
    }

}


// Updates post when the user is the posts author or admin
exports.updatePost = async (req, res) => {
    try {
        var id = req.params.id
        const oldPost = await Post.findById(id)
        var hasAdmin = await isUserAdminBool(req.userId)
        if (!oldPost) res.status(404).send("No post with that id found")
        if (oldPost.user.toString() === req.userId || hasAdmin) {
            var splitTags = oldPost.tags
            var body = oldPost.body
            var location = oldPost.location
            var title = oldPost.title
            if (req.body.tags) {
                const stringTags = req.body.tags
                splitTags = stringTags.split(',')
            }

            if (req.body.body) {
                body = req.body.body
            }
            if (req.body.title) {
                title = req.body.title
            }
            if (req.body.location) {
                location = req.body.location
            }
            const newPost = {
                body: body,
                title: title,
                tags: splitTags,
                location: location,
            }

            const updatedPost = await Post.findByIdAndUpdate(id, newPost)
            res.status(200).send(`Successfully updated the following post: \n 
            ${updatedPost}`)
        } else {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
    } catch (e) {
        res.status(500)
    }

}

// Deletes post from db and removes post file when the user is the posts author or admin
exports.deletePost = async (req, res) => {
    try {
        var id = req.params.id
        const post = await Post.findById(id)
        const hasAdmin = await isUserAdminBool(req.userId)
        if (!post) res.status(404).send("No post with that id found")
        if (post.user.toString() === req.userId || hasAdmin) {
            if (!post) res.status(404).send("No post with that id found")
            else {
                console.log(post.postMediaName)
                try{
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
    } catch (e) {
        return res.status(500)
    }

}

// Checks if user is admin
isUserAdminBool = async (userId) => {
    const user = await User.findById(userId).populate("roles")
    if (!user) res.status(404).send("User not found")
    for (let i = 0; i < user.roles.length; i++) {
        if (user.roles[i].name === "admin") {
            return true;
        }
    }
    return false;
}