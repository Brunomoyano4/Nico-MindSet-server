const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostulantsSchema = new Schema
  ({
    first_name: String, 
    last_name: String,
    user_name: String,
    email: String,
    password: String,
    birth_date: Date,
    street: String,
    street_number: Number,
    city: String,
    postal_code: String,
    province: String,
    country: String,
    telephone: Number,
    experience: Array 
    [{
        job_position: String,
        employer: String,
        star_date: Date,
        end_date: Date,
        description: String
    }]
  })
module.exports = mongoose.model('Postulants', PostulantsSchema)




