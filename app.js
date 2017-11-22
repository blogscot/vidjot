const express = require('express')
const methodOverride = require('method-override')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')

const ideaRoutes = require('./routes/idea')
const app = express()

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

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
