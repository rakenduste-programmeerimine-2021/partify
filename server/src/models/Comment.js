const { Schema, model } = require('mongoose')
const User = require('./User');
const Post = require('./Post');

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: User, required: true },
    post: { type: Schema.Types.ObjectId, ref: Post, required: true },
    body: { type: String, required: true},
    // parent_id: {type: Schema.Types.ObjectId, ref: Comment },
    likes: { type: Number, default: 0},
    dislikes: { type: Number, default: 0},
}, {timestamps: true});

const Comment = model("Comment", commentSchema)

module.exports = Comment