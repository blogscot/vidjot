const express = require('express')
const router = express.Router()
const db = require('../models')

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

  if (errors.length > 0) {
    res.render('auth/register', {
      name,
      email,
      password,
      errors,
    })
  } else {
    res.redirect('/ideas')
  }
})

module.exports = router
