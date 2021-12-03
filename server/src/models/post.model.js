const { Schema, model } = require('mongoose');
const User = require('./user.model');


const postSchema = new Schema({
  body: { type: String, required: true },
  postMediaType: { type: String, enum : ['Image', 'Video'], required: true },
  postMediaName: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required:true},
  tags: { type: Array },
  likes: { type: Number, default: 0},
  dislikes: { type: Number, default: 0},
  user: { type: Schema.Types.ObjectId, ref: User, required: true },
  isLocked: { type: Boolean, default: false},
  comments : [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
}],
}, {timestamps: true});

const Post = model("Post", postSchema)

module.exports = Post