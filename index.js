const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
const { PORT, DB_URI } = process.env

const teamSchema = new mongoose.Schema({
    title: String,
    tier: String,
    creator: String,
    tags: Array,
    importable: String
})

const Team = mongoose.model('Team', teamSchema)

app.use(bodyParser.json())

app.get('/teams', async function (req, res) {
    try {
        const teams = await Team.find();
        res.send(teams)
    } catch (err) {
        console.error('Error getting teams')
        res.status(502).send('Error 502')
    }
})

app.post('/teams', async (req, res) => {
    const team = new Team({
        title: req.body.title,
        tier: req.body.tier,
        creator: req.body.creator,
        tags: req.body.tags,
        importable: req.body.importable,
    })
    try {
        await team.save();
        console.log('messaged saved to db')
        res.send()
    } catch (err) {
        console.error(err, 'error saving message')
        res.status(502).send('Error 502')
    }
})

mongoose.connect(DB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log('mvp2 listening on ', PORT)
})