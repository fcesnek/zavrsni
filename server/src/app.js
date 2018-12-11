const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./config/config')
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./passport')

mongoose.connect('mongodb://localhost/bexerc')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

require('./routes')(app)

app.listen(config.port)
console.log(`Server started on port ${config.port}`)
