const mongoose = require('mongoose')
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  exerciseToDo: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  exerciseDone: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  history: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  age: {
    type: Number
  },
  gender: {
    type: String
  },
  restedHeartRate: {
    type: Number
  },
  waistCircumference: {
    type: Number
  },
  O2Peak: {
    type: Number
  },
  bodyFocus: {
    type: [String]
  }
}, {timestamps: true})

userSchema.pre('save', function () {
  const SALT_FACTOR = 8
  const user = this
  user.updatedAt = Date.now()
  if (!user.isModified('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.password = hash
    })
})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareAsync(candidatePassword, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports.User = User
