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

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/jokes", async (req, res) => {
  const allJokes = await JokeBook.find({});
  res.render("index.ejs", { joke: allJokes });
});

app.get("/jokes/new", (req, res) => {
  res.render("jokes/new.ejs");
});

app.get("/jokes/:jokeId", async (req, res) => {
  try {
    const foundJoke = await JokeBook.findById(req.params.jokeId);
    res.render("jokes/show.ejs", { joke: foundJoke });
  } catch (error) {
    // console.error("Error fetching joke:", error);
    res.status(500).send("Error fetching joke");
  }
});

app.post("/jokes", async (req, res) => {
  const { title, date, genre, joke } = req.body;
  const newJoke = new JokeBook({ title, date, genre, joke });
  await newJoke.save();
  res.redirect("/jokes");
});






app.listen(3011, () => {
  console.log("Server running on port 3011");
});
