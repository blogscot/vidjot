const express = require('express')
const methodOverride = require('method-override')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const passport = require('passport')
require('./config/passport')(passport)

const usersRoute = require('./routes/users')
const ideaRoutes = require('./routes/idea')
const { ensureAuthenticated } = require('./helpers/auth')

const app = express()

// Middleware
// configuration for static css and images files
app.use(express.static(path.join(__dirname, '/')))

app.use(
  session({
    secret: 'ldD2231c92n39dqps@ah-234',
    resave: true,
    saveUninitialized: true,
  })
)

// Use Passport after sesssion setup
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.engine('handlebars', hbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(flash())

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

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

app.use('/users', usersRoute)
app.use('/ideas', ensureAuthenticated, ideaRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server available on http://localhost:${port}`)
})
