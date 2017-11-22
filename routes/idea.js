const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', (req, res) => {
  const title = 'Ideas'
  const ideas = db.Idea.find({})
    .sort({ date: 'desc' })
    .then(ideas => {
      res.render('ideas', {
        title,
        ideas,
      })
    })
})

router.get('/edit/:id', (req, res) => {
  const { id } = req.params
  db.Idea.findOne({ _id: id }).then(idea => {
    res.render('ideas/edit', { idea })
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
    new db.Idea({
      title,
      details,
    })
      .save()
      .then(() => res.redirect('/ideas'))
  }
})

router.get('/add', (req, res) => {
  res.render('ideas/add')
})

module.exports = router
