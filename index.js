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

app.put('/teams', async (req, res) => {
    const query = { _id: req.body._id }; // update this comment
    const newText = { importable: req.body.importable };
    try {
        await Team.findOneAndUpdate(query, newText)
        res.status(200).send('Message updated successfully')
    } catch (err) {
        console.error('Error updating message', err)
        res.send('Error updating')
    }
})

app.delete('/teams', async (req, res) => {
    const query = req.body._id;
    try {
        await Team.findOneAndDelete(query)
        res.status(200).send('Message deleted')
    } catch (err) {
        console.log('Error deleting message', err)
        res.send('Error deleting')
    }
})

mongoose.connect(DB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log('mvp2 listening on', PORT)
})