const express = require('express')
const app = express()
require('dotenv').config()
const { PORT, DB_URI } = process.env;

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('mvp2 listening on ', PORT)
})