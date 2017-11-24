const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcryptjs')
const passport = require('passport')

const user = new db.User()

router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.get('/register', (req, res) => {
  res.render('auth/register')
})

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

router.post('/login', (req, res) => {
  const { email, password } = req.body

  db.User.findOne({ email })
    .then(user => {
      bcrypt.compare(password, user.password).then(result => {
        if (result) {
          req.flash(
            'success_msg',
            `Welcome ${user.name}, you are now logged in`
          )
          res.redirect('/ideas')
        } else {
          req.flash('error_msg', 'Unable to login.')
          res.redirect('login')
        }
      })
    })
    .catch(err => {
      req.flash('error_msg', 'Unable to login.')
      res.redirect('login')
    })
})

module.exports = router
