const {User} = require('../models/User')
const {Exercise} = require('../models/Exercise')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user._id
      const exerciseId = req.query.exerciseId
      const userData = {
        _id: userId
      }
      if(exerciseId) {
        userData.history = exerciseId
      }
      const history = await User.find(userData, 'history')
      let exerciseIdList = history[0].history
      const exercises = await Exercise
        .find({_id: { $in: exerciseIdList}})
      res.send(exercises)
    } catch (err) {
      res.status(500).send({
        error: `Error while retrieving user history.`
      })
    }
  },
  async add (req, res) {
    try {
      const userId = req.user._id
      const exerciseId = req.body.exerciseId
      
      const user = await User.findByIdAndUpdate(userId, {
        $addToSet: { history: exerciseId }
      }, {new: true})

      await Exercise.findByIdAndUpdate(exerciseId, {historyUpdateAt: new Date()})
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: `Error while adding the item to history.`
      })
    }
  },
  async clear (req, res) {
    try {
      const userId = req.user._id
      const user = await User.findByIdAndUpdate(userId, {
        $set: { history: [] }
      }, {new: true})
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: `Error while clearing user history.`
      })
    }

  }
}
