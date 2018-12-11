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
        userData.exerciseDone = exerciseId
      }

      const exerciseDone = await User.find(userData, 'exerciseDone')
      let exerciseIdList = exerciseDone[0].exerciseDone
      const exercises = await Exercise
        .find({_id: { $in: exerciseIdList}})
      res.send(exercises)
    } catch (err) {
      res.status(500).send({
        error: `Error while retrieving finished exercises.`
      })
    }
  },
  async add (req, res) {
    try {
      const userId = req.user._id
      const exerciseId = req.body.exerciseId
      
      const user = await User.findByIdAndUpdate(userId, {
        $addToSet: { exerciseDone: exerciseId }
      }, {new: true})

      await Exercise.findByIdAndUpdate(exerciseId, {finishedAt: new Date()})
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: `Error while adding the exercise to the list of finished exercises.`
      })
    }
  },
  async remove (req, res) {
    try {
      const userId = req.user._id
      const exerciseId = req.query.exerciseId
      console.log('req body', req.body)
      console.log('req user', req.user)
      let user = await User.find({
        _id: userId,
        exerciseDone: exerciseId
      })
      if(user.length === 0) {
        return res.status(403).send({
          error: 'You do not have the permission to remove the item from the list.'
        })
      } else {
        user = await User.findByIdAndUpdate(userId, {
          $pull: { exerciseDone: exerciseId }
        }, {new: true})
      }
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: `Error while deleting the exercise from the list of finished exercises.`
      })
    }
  }
}

