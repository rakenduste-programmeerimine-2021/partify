const Post = require('../models/Post')
const Votes = require('../models/Votes')
var fs = require('fs')


// Votes functions needs to be moved to votesController when
// user and comments controllers are functioning

updateVotes = async function (postId) {
    const likes = await Votes.find({
        post: postId,
        liked: true
    }).select('liked').count()
    const dislikes = await Votes.find({
        post: postId,
        disliked: true
    }).select('disliked').count()

    const updatedVote = await Post.findByIdAndUpdate(postId, {
        likes: likes,
        dislikes: dislikes
    })
}

exports.likePost = async function (req, res) {
    try {
        var id = req.params.id
        var user = "6"
        const like = {
            user: user,
            post: id,
            liked: true,
            disliked: false,
        }


        const updatedLike = await Votes.findOneAndUpdate({
                post: id,
                user: user
            },
            like, {
                upsert: true,
            }
        )

        const updateVote = await updateVotes(id)
        res.status(200).send("Liked");
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

exports.dislikePost = async function (req, res) {
    try {
        var id = req.params.id
        var user = "6"
        const dislike = {
            user: user,
            post: id,
            liked: false,
            disliked: true,
        }


        const updatedDislike = await Votes.findOneAndUpdate({
                post: id,
                user: user
            },
            dislike, {
                upsert: true,
            }
        )
        const updateVote = await updateVotes(id)
        res.status(200).send("Disliked");
    } catch (e) {
        res.status(400).send(e)
    }
}


// Creates new post in db and saves user file to uploads dir
exports.createPost = async function (req, res) {
    const originalName = req.file.originalname
    const fileExtension = originalName.split('.').pop()
    const filePath = req.file.path
    const fullFileName = filePath + '.' + fileExtension;
    if (req.file) {
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
            user: "test",
            postType: req.body.postType
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
};


// Doesn't really need explaining?
exports.getOnePost = async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (!post) res.status(404).send("No post with that id found")
    else res.status(200).send(post)
}


// Doesn't really need explaining?
exports.getPosts = async (req, res) => {
    const posts = await Post.find({})
    if (!posts) res.status(404).send("No posts found")
    else res.status(200).send(posts)
}


// Doesn't really need explaining?
exports.updatePost = async (req, res) => {
    var id = req.params.id

    if (req.body.tags) {
        const stringTags = req.body.tags
        var splitTags = stringTags.split(',')
    }

    const newPost = {
        body: req.body.body,
        title: req.body.title,
        tags: splitTags,
        location: req.body.location,
    }

    const updatedPost = await Post.findByIdAndUpdate(id, newPost)
    res.status(200).send(`Successfully updated the following post: \n 
        ${updatedPost}`)
}


// Deletes post from db and removes post file
exports.deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (!post) res.status(404).send("No post with that id found")
    else {
        console.log(post.postMediaName)
        fs.unlink(post.postMediaName, function (err) {
            if (err) console.log("file not found")
            post.delete();
            console.log('File deleted!');
            res.status(200).send("post deleted")
        });
    }
}