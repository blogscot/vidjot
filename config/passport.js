const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const db = require('../models')

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      db.User.findOne({ email }).then(user => {
        if (!user) {
          return done(null, false, { message: 'No user found' })
        }
        bcrypt.compare(password, user.password, (err, passwordsMatch) => {
          if (err) {
            return done(err)
          }
          if (!passwordsMatch) {
            return done(null, false, { message: 'Invalid password' })
          }
          return done(null, user)
        })
      })
    })
  )

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    db.User.findById(id, function(err, user) {
      done(err, user)
    })
  })
}
