const {
    Schema,
    model
} = require('mongoose');
const User = require('./user.model');
const Comment = require('./comment.model');
const Post = require('./post.model');



const votesSchema = new Schema({
    voter: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    votedUser: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: Comment
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: Post
    },
    liked: {
        type: Boolean,
        default: false
    },
    disliked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Votes = model("Votes", votesSchema)

module.exports = Votes