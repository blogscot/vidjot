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

router.delete('/delete/:id', (req, res) => {
  const { id } = req.params
  db.Idea.findByIdAndRemove({ _id: id }, () => {
    req.flash('success_msg', 'Video Idea removed')
    res.redirect('/ideas')
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { title, details } = req.body
  db.Idea.findByIdAndUpdate({ _id: id }, { title, details }, () => {
    req.flash('success_msg', 'Video Idea updated')
    res.redirect('/ideas')
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
    req.flash('success_msg', 'New Video idea added')
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
