const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  image_url: { type: String, required: true },
  cloudinary_id: { type: String, required: true },
  feelings: { type: String, required: true },
  brand: { type: String, required: true }

  // colours from cloud vision API
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;