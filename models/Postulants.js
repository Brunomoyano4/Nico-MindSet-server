const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostulantsSchema = new Schema ({
  firstName: {type: String, lowercase: true, required: true},
  lastName: {type: String, lowercase: true, required: true},
  userName: {type: String, lowercase: true, required: true},
  email: {type: String, lowercase: true, required: true},
  password: {type: String, lowercase: true, required: true},
  birthDate: {type: Date, lowercase: true, required: true},
  street: {type: String, lowercase: true, required: true},
  streetNumber: {type: String, lowercase: true, required: true},
  city: {type: String, lowercase: true, required: true},
  postalCode: {type: String, lowercase: true, required: true},
  province: {type: String, lowercase: true, required: true},
  country: {type: String, lowercase: true, required: true},
  telephone: {type: String, lowercase: true, required: true},
  experience:
  [{
      jobPosition: {type: String, lowercase: true, required: true},
      employer: {type: String, lowercase: true, required: true},
      starDate: {type: Date, lowercase: true, required: true},
      endDate: {type: Date, lowercase: true, required: true},
      description: {type: String, lowercase: true, required: true}
  }]
})
module.exports = mongoose.model('Postulants', PostulantsSchema)