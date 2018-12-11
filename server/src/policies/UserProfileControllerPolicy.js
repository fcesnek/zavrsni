const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-z0-9]{8,32}$')
      ),
      age: Joi.number().integer().min(10).max(75),
      gender: Joi.string(),
      restedHeartRate: Joi.number().integer().min(35).max(140),
      waistCircumference: Joi.number().integer(),
      bodyFocus: Joi.array()
    }
    const {error, value} = Joi.validate(req.body, schema)
    if (error) {
      console.log('error', error)
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must enter a valid email address.'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Provided password must obide the following rules:
            <br>
            1. It can contain only capital and non-capital letters, and numbers
            <br>
            2. It must be at least 8 characters in length and less than 32 characters in length
            `
          })
          break
        case 'age':
          res.status(400).send({
            error: `Entered age must be an integer between 10 and 75.`
          })
          break
        case 'gender':
          res.status(400).send({
            error: `Invalid gender value.`
          })
          break
        case 'restedHeartRate':
          res.status(400).send({
            error: `Entered rested heart rate must be an integer between 35 and 140`
          })
          break
        case 'waistCircumference':
          res.status(400).send({
            error: `You must enter an integer.`
          })
          break
        case 'bodyFocus':
          res.status(400).send({
            error: 'Invalid body focus data.'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration data.'
          })
      }
    } else {
      next()
    }
  },
  update (req, res, next) {
    const schema = {
      age: Joi.number().integer().min(10).max(75),
      gender: Joi.string(),
      restedHeartRate: Joi.number().integer().min(35).max(140),
      waistCircumference: Joi.number().integer(),
      bodyFocus: Joi.array(),
      O2Peak: Joi.number()
    }
    const {error, value} = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'age':
          res.status(400).send({
            error: `Entered age must be an integer between 10 and 75.`
          })
          break
        case 'gender':
          res.status(400).send({
            error: `Invalid gender value.`
          })
          break
        case 'restedHeartRate':
          res.status(400).send({
            error: `Entered rested heart rate must be an integer between 35 and 140`
          })
          break
        case 'waistCircumference':
          res.status(400).send({
            error: `You must enter an integer.`
          })
          break
        case 'bodyFocus':
          res.status(400).send({
            error: 'Invalid body focus data.'
          })
          break
        case 'O2Peak':
          res.status(400).send({
            error: 'Invalid body focus data.'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid update data.'
          })
      }
    } else {
      next()
    }
  }
}

