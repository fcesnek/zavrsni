const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  title: {
    type: String
  },
  bodyFocus: {
    type: String
  },
  duration: {
    type: Number
  },
  exerciseImgUrl: {
    type: String
  },
  youtubeId: {
    type: String
  },
  description: {
    type: String
  },
  historyUpdateAt: {
    type: Date
  },
  finishedAt: {
    type: Date
  },
  minO2: {
    type: Number
  }
}, { timestamps: true })

const Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports.Exercise = Exercise