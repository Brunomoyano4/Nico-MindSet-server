const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const PshychologistSchema = new Schema ({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    user_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

module.exports = mongoose.model("Psychologists", PshychologistSchema)