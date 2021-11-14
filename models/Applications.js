const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApplicationsSchema = new Schema({
  postulantId: { type: String, required: true },
  positionId: { type: String, required: true },
  createdAt: { type: String, required: true}
})

module.exports = mongoose.model('Applications', ApplicationsSchema)

//getApplications
//ApplicationByPositionId
//getApplicationByPostulantId
//createApplication
//deleteApplication

// "postulantId"
// "positionId"
// "createdAt":