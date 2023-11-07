const Post = require("../models/post.model");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send({ message: "Posts found", post: posts });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

const getSingleUserPosts = async (req, res) => {
    try {
        const id = req.userId
        const singlePost = await Note.find({_id: id});
        res.status(200).send({ message: "Note found", singleNotes });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
}

const createPost = async (req, res) => {
  try {
    const { description, media } = req.body;
    const newPost = new Post({
      description,
      media,
      userId: req.userId,
    });
    await newPost.save();
    res.status(200).send({ message: "Post created", newPost });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { description, media } = req.body;
    const updatedPost = await Note.findByIdAndUpdate(
      id,
      { description, media },
      { new: true }
    );
    res.status(200).send({ message: "Post updated", updatedPost });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedPost = await Note.findByIdAndDelete(id);
    res.status(200).send({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getSingleUserPosts,
};
