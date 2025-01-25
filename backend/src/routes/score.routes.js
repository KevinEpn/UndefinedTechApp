const express = require('express');
const router = express.Router();
const Score = require('../models/score.model');

//MIDDLEWARE
const getScore = async (req, res, next) => {
    let score;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ message: 'Invalid score ID' })        
    }

    try {
        score = await Score.findById(id);
        if (!score) {
            return res.status(404).json({ message: 'Score not found' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.score = score;
    next();
}

//GET ALL SCORES
router.get('/', async (req, res) => {
    try {
        const scores = await Score.find();
        if (scores.length === 0) {
            return res.status(204).json({ message: 'No scores found' })
            
        }
        res.json(scores)
    } catch (error) {
        res.status(500).json({ message: error.message })   
    }
})

//NEW SCORE
router.post('/', async (req, res) => {
    const {name, date, time, score} = req?.body;
    if (!name || !date || !time || !score) {
        return res.status(400).json({ message: 'Please fill all fields' })   
    }

    const newScore = new Score(
        {
            name, 
            date, 
            time, 
            score
        }
    )

    try {
        const savedScore = await newScore.save();
        res.status(201).json(savedScore)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

//GET SCORE BY ID
router.get('/:id', getScore, async(req, res) => {
    res.json(res.score);
})

//PUT SCORE BY ID
router.put('/:id', getScore, async (req, res) => {
    try {
        const score = res.score;
        score.name = req.body.name || score.name;
        score.date = req.body.date || score.date;
        score.time = req.body.time || score.time;
        score.score = req.body.score || score.score;

        const updatedScore = await score.save();
        res.json(updatedScore);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }   
})

//PATCH SCORE BY ID
router.patch('/:id', getScore, async (req, res) => {
    if (!req.body.name && !req.body.date && !req.body.time && !req.body.score) {
        return res.status(400).json({ message: 'Body can not be empty' })        
    }

    try {
        const score = res.score;
        score.name = req.body.name || score.name;
        score.date = req.body.date || score.date;
        score.time = req.body.time || score.time;
        score.score = req.body.score || score.score;

        const updatedScore = await score.save();
        res.json(updatedScore);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }   
})

//DELETE SCORE BY ID
router.delete('/:id', getScore, async (req, res) => {
    try {
        const score = res.score;
        await score.deleteOne({
            _id: score._id
        });
        res.json({ message: 'Score deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })   
    }
})

module.exports = router;