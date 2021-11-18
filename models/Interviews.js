const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const InterviewSchema = new Schema ({
    positionId: {type: String, lowercase: true, required: true},
    postulantId: {type: String, lowercase: true, required: true},
    dateTime: {type: Date, required: true},
    status: {type: String, enum: ['pending', 'cancelled', 'next step', 'finished'], lowercase: true, required: true}
})

module.exports = mongoose.model("Interviews", InterviewSchema)