const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  description: { type: String, required: true },
  media: { type: String }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
