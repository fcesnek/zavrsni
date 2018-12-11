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
        userData.exerciseToDo = exerciseId
      }
      const exercisesToDo = await User.find(userData, 'exerciseToDo')
      let exerciseIdList = exercisesToDo[0].exerciseToDo

      const exercises = await Exercise
        .find({_id: { $in: exerciseIdList}})
      res.send(exercises)
    } catch (err) {
      res.status(500).send({
        error: `Error while retrieving user exercise plan.`
      })
    }
  },
  async add (req, res) {
    try {
      const userId = req.user._id
      const exerciseId = req.params.exerciseId
      let user = await User.find({
        _id: userId,
        exerciseToDo: exerciseId
      })
      if(user.length) {
        return res.status(403).send({
          error: 'This exercise is already on the list.'
        })
      }
      user = await User.findByIdAndUpdate(userId, {
        $push: { exerciseToDo: exerciseId }
      }, {new: true})

      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: `Error while adding the exercise to user exercise plan.`
      })
    }
  },
  async remove (req, res) {
    try {
      const userId = req.user._id
      const exerciseId = req.query.exerciseId
      let user = await User.find({
        _id: userId,
        exerciseToDo: exerciseId
      })
      if(user.length === 0) {
        return res.status(403).send({
          error: 'You do not have the permission to remove the item from the list.'
        })
      } else {
        user = await User.findByIdAndUpdate(userId, {
          $pull: { exerciseToDo: exerciseId }
        }, {new: true})
      }
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: `Error while deleting the exercise from user exercise plan.`
      })
    }
  }
}

