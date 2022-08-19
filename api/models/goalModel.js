const mongoose = require('mongoose')

const Schema = mongoose.Schema

const goalSchema = new Schema({
  goals: {
    type: String,
    required: true
  },
  timeFrame: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Goal', goalSchema)
