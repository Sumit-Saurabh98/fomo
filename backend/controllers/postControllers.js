const Post = require("../models/post.model");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send({ message: "Posts found", posts: posts });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

const getSingleUserPosts = async (req, res) => {
    try {
        const id = req.userId
        const singlePost = await Post.find({_id: id});
        res.status(200).send({ message: "Note found", singlePost });
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

    // Find the post by ID
    const post = await Post.findById(id);
    

    // Check if the post exists
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    // Convert req.userId to ObjectId
    const userIdAsObjectId = new ObjectId(req.userId);
    

    // Check if the user making the request is the owner of the post
    if (!post.userId.equals(userIdAsObjectId)) {
      return res.status(403).send({ message: "Unauthorized to update this post" });
    }

    // Update the post if the user is the owner
    const updatedPost = await Post.findByIdAndUpdate(id, { description, media }, { new: true });
    res.status(200).send({ message: "Post updated", updatedPost });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    // Find the post by ID
    const post = await Post.findById(id);

    // Check if the post exists
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    // Convert req.userId to ObjectId
    const userIdAsObjectId = mongoose.Types.ObjectId(req.userId);

    // Check if the user making the request is the owner of the post
    if (!post.userId.equals(userIdAsObjectId)) {
      return res.status(403).send({ message: "Unauthorized to delete this post" });
    }

    // Delete the post if the user is the owner
    const deletedPost = await Post.findByIdAndDelete(id);
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
