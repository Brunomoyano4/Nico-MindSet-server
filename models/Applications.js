const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApplicationsSchema = new Schema({
  id: Schema.Types.ObjectId,
  postulantId: { type: Number, required: true },
  positionId: { type: Number, required: true },
  createdAt: { type: Number, required: true}
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