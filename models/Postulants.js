const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostulantsSchema = new Schema ({
  first_name: {type: String, lowercase: true, required: true},
  last_name: {type: String, lowercase: true, required: true},
  user_name: {type: String, lowercase: true, required: true},
  email: {type: String, lowercase: true, required: true},
  password: {type: String, lowercase: true, required: true},
  birth_date: {type: Date, lowercase: true, required: true},
  street: {type: String, lowercase: true, required: true},
  street_number: {type: String, lowercase: true, required: true},
  city: {type: String, lowercase: true, required: true},
  postal_code: {type: String, lowercase: true, required: true},
  province: {type: String, lowercase: true, required: true},
  country: {type: String, lowercase: true, required: true},
  telephone: {type: String, lowercase: true, required: true},
  experience:
  [{
      job_position: {type: String, lowercase: true, required: true},
      employer: {type: String, lowercase: true, required: true},
      star_date: {type: Date, lowercase: true, required: true},
      end_date: {type: Date, lowercase: true, required: true},
      description: {type: String, lowercase: true, required: true}
  }]
})
module.exports = mongoose.model('Postulants', PostulantsSchema)




