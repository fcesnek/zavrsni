const {User} = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}
module.exports = {
  async register (req, res) {
    const adminCode = req.body.adminCode
    let isAnAdmin = false
    let PA_INDEX = req.body.gender === 'Male' ? 0.44 : 0.39
    let O2Peak = null

    if(req.body.gender === 'Male') {
      O2Peak = 100.27 - (0.296 * req.body.age) - (0.369 * req.body.waistCircumference) - (0.155 * req.body.restedHeartRate) + (0.226 * PA_INDEX)
    } else {
      O2Peak = 74.74 - (0.247 * req.body.age) - (0.259 * req.body.waistCircumference) - (0.114 * req.body.restedHeartRate) + (0.198 * PA_INDEX)
    }

    if(adminCode === config.authentication.adminSecret) {
      isAnAdmin = true
    }

    let user = new User({
      email: req.body.email,
      password: req.body.password,
      isAdmin: isAnAdmin,
      age: req.body.age,
      gender: req.body.gender,
      bodyFocus: req.body.bodyFocus,
      restedHeartRate: req.body.restedHeartRate,
      waistCircumference: req.body.waistCircumference,
      O2Peak: O2Peak
    })
    try {
      user.save(function (error, user) {
        if (error) {
          res.status(400).send({
            error: `This email address is already in use.`
          })
        } else {
          const userJson = user.toJSON()
          res.send({
            user: userJson,
            token: jwtSignUser(userJson)
          })
        }
      })
    } catch (error) {
      res.status(400).send({
        error: `This email address is already in use.`
      })}
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      let user = await User.findOne({
        email: email
      })
      if (!user) {
        return res.status(403).send({
          error: 'Invalid login data.'
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Invalid login data.'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: `An error has occurred while authenticating the user.`
      })
    }
  },
  async update (req, res) {
    try {
      const userId = req.user._id
      const userUpdate = req.body
      let PA_INDEX = req.body.gender === 'Male' ? 0.44 : 0.39
      let O2Peak = null

      if(req.body.gender === 'Male') {
        O2Peak = 100.27 - (0.296 * req.body.age) - (0.369 * req.body.waistCircumference) - (0.155 * req.body.restedHeartRate) + (0.226 * PA_INDEX)
      } else {
        O2Peak = 74.74 - (0.247 * req.body.age) - (0.259 * req.body.waistCircumference) - (0.114 * req.body.restedHeartRate) + (0.198 * PA_INDEX)
      }
      userUpdate.O2Peak = O2Peak
      let user = await User.findByIdAndUpdate(userId, userUpdate)
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: `An error has occured while editing profile settings.`
      })
    }
  },
  async show (req, res) {
    try {
      const user = await User.findById(req.user._id, 'age gender waistCircumference restedHeartRate bodyFocus O2Peak -_id')
      res.send(user)
    } catch (error) {
      res.status(500).send({
        error: 'Error fetching user data.'
      })
    }
  }
}
