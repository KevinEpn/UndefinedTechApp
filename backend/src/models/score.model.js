const { default: mongoose } = require("mongoose")

const scoreSchema = new mongoose.Schema(
    {
        name: String,
        date: Date,
        formattedTime: String,
        score: Number
    }
)

module.exports = mongoose.model('Score', scoreSchema)