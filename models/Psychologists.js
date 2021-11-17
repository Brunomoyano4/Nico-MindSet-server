const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const PshychologistSchema = new Schema ({
    firstName: {type: String, lowercase: true, required: true},
    lastName: {type: String, lowercase: true, required: true},
    userName: {type: String, lowercase: true, required: true},
    email: {type: String, lowercase: true, required: true},
    password: {type: String, lowercase: true, required: true},
})

module.exports = mongoose.model("Psychologists", PshychologistSchema)