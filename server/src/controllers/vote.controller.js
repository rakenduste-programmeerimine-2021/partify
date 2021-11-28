const db = require("../models");
const User = db.user;
const Post = db.post;
const Vote = db.vote;
const Comment = db.comment;

// Updates post/user or comment votes when called, counts likes and dislikes
updateVotes = async function (voteTypeId, voteType) {
    try {
        if (voteType === "post") {
            const likes = await Vote.find({
                post: voteTypeId,
                liked: true
            }).select('liked').count()
            const dislikes = await Vote.find({
                post: voteTypeId,
                disliked: true
            }).select('disliked').count()

            const updatedVote = await Post.findByIdAndUpdate(voteTypeId, {
                likes: likes,
                dislikes: dislikes
            })
        } else if (voteType === "votedUser") {
            const likes = await Vote.find({
                votedUser: voteTypeId,
                liked: true
            }).select('liked').count()
            const dislikes = await Vote.find({
                votedUser: voteTypeId,
                disliked: true
            }).select('disliked').count()

            const updatedVote = await User.findByIdAndUpdate(voteTypeId, {
                likes: likes,
                dislikes: dislikes
            })
        } else if (voteType === "comment") {
            const likes = await Vote.find({
                comment: voteTypeId,
                liked: true
            }).select('liked').count()
            const dislikes = await Vote.find({
                comment: voteTypeId,
                disliked: true
            }).select('disliked').count()

            const updatedVote = await Comment.findByIdAndUpdate(voteTypeId, {
                likes: likes,
                dislikes: dislikes
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500)
    }

}

// Adds like to vote
voteLike = async function (voteType, userId, voteTypeId, like) {

    try {
        if (voteType === "post") {
            const updatedLike = await Vote.findOneAndUpdate({
                    post: voteTypeId,
                    voter: userId
                },
                like, {
                    upsert: true,
                }
            )
            const updateVote = await updateVotes(voteTypeId, "post")
        } else if (voteType === "votedUser") {
            const updatedLike = await Vote.findOneAndUpdate({
                    votedUser: voteTypeId,
                    voter: userId
                },
                like, {
                    upsert: true,
                }
            )
            const updateVote = await updateVotes(voteTypeId, "votedUser")
        } else if (voteType === "comment") {
            const updatedLike = await Vote.findOneAndUpdate({
                    comment: voteTypeId,
                    voter: userId
                },
                like, {
                    upsert: true,
                }
            )
            const updateVote = await updateVotes(voteTypeId, "comment")
        } else {
            res.status(500)
        }



    } catch (e) {
        console.log(e)
        res.status(500)
    }

}

// Adds dislike to vote
voteDislike = async function (voteType, userId, voteTypeId, dislike) {

    try {
        if (voteType === "post") {
            const updatedDislike = await Vote.findOneAndUpdate({
                    post: voteTypeId,
                    voter: userId
                },
                dislike, {
                    upsert: true,
                }
            )
            const updateVote = await updateVotes(voteTypeId, "post")
        } else if (voteType === "votedUser") {
            const updatedDislike = await Vote.findOneAndUpdate({
                    votedUser: voteTypeId,
                    voter: userId
                },
                dislike, {
                    upsert: true,
                }
            )
            const updateVote = await updateVotes(voteTypeId, "votedUser")
        } else if (voteType === "comment") {
            const updatedDislike = await Vote.findOneAndUpdate({
                    comment: voteTypeId,
                    voter: userId
                },
                dislike, {
                    upsert: true,
                }
            )
            const updateVote = await updateVotes(voteTypeId, "comment")
        } else {
            res.status(500)
        }

    } catch (e) {
        console.log(e)
        res.status(500)
    }

}


// Likes post
exports.likePost = async function (req, res) {
    try {
        var id = req.params.id
        var user = req.userId
        const like = {
            voter: user,
            post: id,
            liked: true,
            disliked: false,
        }

        const likeAndUpdateVote = await voteLike("post", user, id, like)
        res.status(200).send("Liked");
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}
// Likes user
exports.likeUser = async function (req, res) {
    try {
        var id = req.params.id
        var user = req.userId
        const like = {
            voter: user,
            votedUser: id,
            liked: true,
            disliked: false,
        }

        const likeAndUpdateVote = await voteLike("votedUser", user, id, like)
        res.status(200).send("Liked");
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}
// Likes comment
exports.likeComment = async function (req, res) {
    try {
        var id = req.params.id
        var user = req.userId
        const like = {
            voter: user,
            comment: id,
            liked: true,
            disliked: false,
        }

        const likeAndUpdateVote = await voteLike("comment", user, id, like)
        res.status(200).send("Liked");
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}

// Dislikes post
exports.dislikePost = async function (req, res) {
    try {
        var id = req.params.id
        var user = req.userId
        const dislike = {
            voter: user,
            post: id,
            liked: false,
            disliked: true,
        }

        const dislikeAndUpdateVote = await voteDislike("post", user, id, dislike)
        res.status(200).send("Disliked");
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}
// Dislikes user
exports.dislikeUser = async function (req, res) {
    try {
        var id = req.params.id
        var user = req.userId
        const dislike = {
            voter: user,
            votedUser: id,
            liked: false,
            disliked: true,
        }

        const dislikeAndUpdateVote = await voteDislike("votedUser", user, id, dislike)
        res.status(200).send("Disliked");
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}
// Dislikes post
exports.dislikeComment = async function (req, res) {
    try {
        var id = req.params.id
        var user = req.userId
        const dislike = {
            voter: user,
            comment: id,
            liked: false,
            disliked: true,
        }

        const dislikeAndUpdateVote = await voteDislike("comment", user, id, dislike)
        res.status(200).send("Disliked");
    } catch (e) {
        console.log(e)
        res.status(500)
    }
}