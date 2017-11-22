const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')

const ideaRoutes = require('./routes/idea')
const db = require('./models')
const app = express()

// Database Schemas
const idea = db.Idea

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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

app.use('/ideas', ideaRoutes)

const port = 5000

app.listen(port, () => {
  console.log(`Server available on http://localhost:${port}`)
})
