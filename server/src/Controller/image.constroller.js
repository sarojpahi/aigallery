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
    });
    const data = response.data;
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
  const { data } = req.body;
  try {
    const file = await fetch(data);
    const blob = await file.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    buffer.name = "image.png";
    console.log(buffer);
    const response = await openai.createImageVariation(buffer, 1, "1024x1024");
    res.send(response.data);
    // console.log(response.data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};
module.exports = { generateImage, variation };
