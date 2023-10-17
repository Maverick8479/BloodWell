const mongoose = require("mongoose");

const postModel = new mongoose.Schema({
  autherName: {
    type: String,
    required: true,
  },
  autherId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postModel);
module.exports = Post;
