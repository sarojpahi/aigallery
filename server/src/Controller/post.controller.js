const Post = require("../Model/post.model");

const postImage = async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const newPost = await Post.create({
      name,
      prompt,
      photo,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
};
const getImage = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
};
module.exports = { postImage, getImage };
