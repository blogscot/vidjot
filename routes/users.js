const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

const db = require('../models')
const user = new db.User()

router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.get('/register', (req, res) => {
  res.render('auth/register')
})

// Process Registration
router.post('/register', (req, res) => {
  let errors = []
  const errorMessages = {
    mismatch: 'Passwords do not match',
    tooShort: 'Password is too short',
  }
  const { name, email, password, confirm } = req.body

  if (password !== confirm) {
    errors = errors.concat([{ message: errorMessages.mismatch }])
  }
  if (password.length < 8) {
    errors = errors.concat([{ message: errorMessages.tooShort }])
  }

  // is the password unique?
  db.User.findOne({ email })
    .then(user => {
      if (user) {
        req.flash('error_msg', 'Email is already registered')
        res.redirect('/users/register')
      } else {
        if (errors.length > 0) {
          res.render('auth/register', {
            name,
            email,
            password,
            errors,
          })
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err
              const newUser = db
                .User({
                  name,
                  email,
                  password: hash,
                })
                .save()
                .then(user => {
                  req.flash('success_msg', `${name}, you are now registered`)
                  res.redirect('/users/login')
                })
                .catch(err => {
                  req.flash('error_msg', 'A problem occurred while registering')
                  res.redirect('/users/register')
                })
            })
          })
        }
      }
    })
    .catch(err => {
      req.flash('error_msg', 'An unexpected error occurred during registration')
      res.redirect('/users/register')
    })
})

// Process Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/ideas',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next)
})

// Process Logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You are now logged out')
  res.redirect('/users/login')
})

module.exports = router
