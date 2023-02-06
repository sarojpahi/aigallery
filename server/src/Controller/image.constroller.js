const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createImage({
      prompt,
      n: 4,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const data = response.data;
    console.log(response.data);
    res.status(200).send(data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).send({
      error: "The image could not be generated",
    });
  }
};
const variation = async (req, res) => {
  const { photo } = req.body;
  try {
    let buff = new Buffer(photo, "base64");
    buff.name = "image.png";
    const response = await openai.createImageVariation(
      buff,
      1,
      "1024x1024",
      "b64_json"
    );
    res.send(response.data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.send("error");
  }
};
module.exports = { generateImage, variation };
