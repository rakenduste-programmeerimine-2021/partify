const {
    Schema,
    model
} = require('mongoose')
const User = require('./user.model');
const Post = require('./post.model');

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: Post
    },
    body: {
        type: String,
        required: true
    },
    parent_id: [this],
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

const Comment = model("Comment", commentSchema)

module.exports = Comment