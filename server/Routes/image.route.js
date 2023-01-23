const express = require("express");
const { generateImage, variation } = require("../Controller/image.constroller");

const router = express.Router();

router.post("/", generateImage);
router.post("/variation", variation);

module.exports = router;
