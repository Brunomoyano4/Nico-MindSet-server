const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firebaseUID: { type: String, required: true, unique: true },
  mongoDBID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  role: { type: String, required: true },
  token: { type: String },
});

module.exports = mongoose.model('Users', UsersSchema);
