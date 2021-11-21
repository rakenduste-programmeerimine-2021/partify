const { Schema, model } = require('mongoose');
const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');



const votesSchema = new Schema({
    // Changes after user controller is created
    user: { type: String, ref: User, required: true },
    comment: { type: Schema.Types.ObjectId, ref: Comment },
    post: { type: Schema.Types.ObjectId, ref: Post },
    liked: { type: Boolean, default: false},
    disliked: { type: Boolean, default: false}
}, {timestamps: true});

const Votes = model("Votes", votesSchema)

module.exports = Votes