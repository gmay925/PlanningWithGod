const mongoose = require('mongoose');

const Schema = mongoose.Schema

const affirmationSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  affirmations: {
    type: String,
    required: true,
  },
  believe: {
    type: String,
    required: true,
  }
}, { timestamps: true })

module.exports = mongoose.model('Affirmation', affirmationSchema)