const express = require('express')
const hbs = require('express-handlebars')
const db = require('./models')

const app = express()

// Middleware
app.engine('handlebars', hbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Routes
app.get('/', (req, res) => {
  const title = 'Welcome'
  res.render('index', {
    title,
  })
})

app.get('/about', (req, res) => {
  res.render('about')
})

const port = 5000

app.listen(port, () => {
  console.log(`Server available on http://localhost:${port}`)
})