const { Schema, model } = require('mongoose');
// const User = require('./User');
// const Comment = require('./Comment');


const postSchema = new Schema({
  body: { type: String, required: true },
  postMediaType: { type: String, enum : ['Image', 'Video'], required: true },
  postMediaName: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required:true},
  tags: { type: Array, required: true},
  likes: { type: Number, default: 0},
  dislikes: { type: Number, default: 0},
  // enable after userController is working
  // user: { type: Schema.Types.ObjectId, ref: User, required: true },
  user: { type: String, required:true},
  postType: { type: String, enum : ['Normal', 'Event'], required: true},
}, {timestamps: true});

const Post = model("Post", postSchema)

module.exports = Post