const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Post = mongoose.model("user", postSchema);
module.exports = Post;
