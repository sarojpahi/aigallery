require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connet = require("./Config/mongoose.config");
const userRoute = require("./Routes/user.route");
const ImageRoute = require("./Routes/image.route");
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoute);
app.use("/generateimage", ImageRoute);

app.listen(port, () => {
  connet()
    .then(() => console.log("Connected to Database"))
    .catch((e) => console.log(e.message));
  console.log(`Server is running at port :${port}`);
});
