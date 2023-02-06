const express = require("express");
const { generateImage, variation } = require("../Controller/image.constroller");
const { postImage, getImage } = require("../Controller/post.controller");

const router = express.Router();

router.post("/", generateImage);
router.post("/variation", variation);
router.post("/postImage", postImage);
router.get("/postImage", getImage);

module.exports = router;
