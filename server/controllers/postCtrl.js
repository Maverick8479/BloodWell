const Post = require("../models/postModel");

exports.createPost = async (req, res, next) => {
  const { autherName, autherId, content } = req.body;
  try {
    console.log(req.body);
    const newPost = await Post.create({
      autherName,
      autherId,
      content,
    });
    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//get all post that and sort them by date
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//get a all post of a user
exports.getPostsByUser = async (req, res, next) => {
  try {
    const posts = await Post.find({ autherId: req.params.id });
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//add a like to a post
exports.addLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likes = post.likes + 1;
    await post.save();
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
