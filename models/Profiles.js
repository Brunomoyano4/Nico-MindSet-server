const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema ({
    id: objectId,
    profile_name: {type: String, lowercase: true, required: true},
    branch: {type: String, lowercase: true, required: true},
    description: {type: String, lowercase: true, required: true},
})

module.exports = mongoose.model("Profile", ProfileSchema)