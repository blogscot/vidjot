const mongoose = require('mongoose')

mongoose.set('debug', true)
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/vidjot', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true,
})

module.exports.Idea = require('./idea')
