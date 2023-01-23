const express = require("express");
// const {
//   signup,
//   login,
//   getProfile,
//   calculate,
// } = require("../Controller/user.controller");

const app = express.Router();
app.get("/", (req, res) => {
  res.send("Server running fine");
});
// app.post("/register", signup);
// app.post("/login", login);
// app.post("/getProfile", getProfile);
// app.post("/calculate", calculate);

module.exports = app;
