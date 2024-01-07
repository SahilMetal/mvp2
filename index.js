const express = require('express')
const mongoose = require('mongoose');
const app = express()
require('dotenv').config()
const { PORT, DB_URI } = process.env

const teamSchema = new mongoose.Schema({
    title: String,
    tier: String,
    creator: String,
    tags: Array
})


app.get('/', function (req, res) {
    res.send('Hello World')
})

mongoose.connect(DB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log('mvp2 listening on ', PORT)
})