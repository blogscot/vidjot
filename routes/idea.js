const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const title = 'Ideas'
  res.render('ideas', {
    title,
  })
})

module.exports = router
