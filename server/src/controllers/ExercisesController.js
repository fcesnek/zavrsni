const {Exercise} = require('../models/Exercise')
const {User} = require('../models/User')
const mongoose = require('mongoose')

module.exports = {
  async post (req, res) {
    try {
      const exercise = new Exercise(req.body)
      exercise.save()
      res.send(exercise)
    } catch (err) {
      res.status(500).send({
        error: `Error while creating a new exercise.`
      })
    }
  },
  async index (req, res) {
    try {
      let exercises = null
      if (req.query.search) {
        exercises = await Exercise.find({
          $or: [
            {'title': new RegExp(req.query.search, 'i')},
            {'bodyFocus': new RegExp(req.query.search, 'i')}
          ]
        })
      } else {
        exercises = await Exercise.find().limit(10)
      }
      res.send(exercises)
    } catch (err) {
      res.status(500).send({
        error: `Error while retrieving exercises.`
      })
    }
  },
  async show (req, res) {
    try {
      const exercise = await Exercise.findById(req.params.exerciseId, '-__v')
      res.send(exercise)
    } catch (err) {
      res.status(500).send({
        error: `Error while retrieving exercises.`
      })
    }
  },
  async put (req, res) {
    try {
      const exerciseId = req.params.exerciseId
      const exerciseUpdate = req.body
      let exercise = await Exercise.findByIdAndUpdate(exerciseId, exerciseUpdate)
      res.send(exercise)
    } catch (err) {
      res.status(500).send({
        error: `Error while editing the exercise.`
      })
    }
  },
  async showSuggestions(req, res) {
    try {
      const userId = req.user._id
      const user = await User.findById(userId, '-__v')
      let exercises = await Exercise.find({
        minO2: {
          $lte: user.O2Peak
        },
        bodyFocus: {
          $in: user.bodyFocus
        }
      })
      res.send(exercises)
    } catch (error) {
      res.status(500).send({
        error: 'Error while retrieving exercises suggestions.'
      })
    }
  }
}