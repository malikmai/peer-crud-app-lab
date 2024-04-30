const mongoose = require('mongoose');

const jokeBookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    genre: String,
    joke: String,
});

const JokeBook = mongoose.model("JokeBook", jokeBookSchema);
module.exports = JokeBook;