const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const JokeBook = require("./models/JokeBook.js");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);
app.use(express.urlencoded({ extended: false }));
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.get("/", async (req, res) => {
  // const allJokes = await JokeBook.find({});
  res.render("home.ejs", {});
});










app.listen(3011, () => {
  console.log("Server running on port 3011");
});
