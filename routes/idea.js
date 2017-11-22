const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const title = 'Ideas'
  res.render('ideas', {
    title,
  })
})

router.post('/', (req, res) => {
  let errorMessages = {
    title: 'Please enter a title.',
    details: 'Please enter some details',
  }
  let { title, details } = req.body
  let errors = []

  if (!title) {
    errors = errors.concat([{ message: errorMessages.title }])
  }
  if (!details) {
    errors = errors.concat([{ message: errorMessages.details }])
  }

  if (errors.length > 0) {
    res.render('ideas/add', {
      errors,
      title,
      details,
    })
  } else {
    res.sendStatus(200)
  }
})

router.get('/add', (req, res) => {
  res.render('ideas/add')
})

module.exports = router
