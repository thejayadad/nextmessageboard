const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require('passport')
const connectDB = require('./config/db')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo');


dotenv.config({ path: './config/config.env' })

connectDB()
require('./config/passport')(passport)


const app = express()
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),

    })
  )


app.use(express.static("public"))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


const PORT = process.env.PORT || 3000


app.listen(
    PORT,
    console.log(`Server running on port ${PORT}`)
  )