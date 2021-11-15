const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionsSchema = new Schema({
  psychologyId: { type: String, required: true },
  postulantId: { type: String, required: true },
  date: { type: Date, required: true},
  time: { type: String, required: true},
  stat: { type: String, required: true}
})

module.exports = mongoose.model('Sessions', SessionsSchema)