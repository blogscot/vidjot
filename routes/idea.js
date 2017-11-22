const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const title = 'Ideas'
  res.render('ideas', {
    title,
  })
})

router.get('/add', (req, res) => {
  res.render('ideas/add')
})

module.exports = router
