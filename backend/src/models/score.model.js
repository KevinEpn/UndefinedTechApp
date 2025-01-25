const { default: mongoose } = require("mongoose")

const scoreSchema = new mongoose.Schema(
    {
        name: String,
        date: Date,
        time: Number,
        score: Number
    }
)

module.exports = mongoose.model('Score', scoreSchema)