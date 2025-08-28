const express = require('express')

const app = express()
app.use(express.json())

app.use('/api/login', require('./controllers/login'))

if (process.env.NODE_ENV !== 'production') {  
  const testingRouter = require('./controllers/testing')  
  app.use('/api/testing', testingRouter)}

// middlewares 
const { tokenExtractor, userExtractor, errorHandler } = require('./utils/middleware')
app.use(tokenExtractor)
app.use(userExtractor)

app.use('/api/blogs', require('./controllers/blogs'))
app.use('/api/users', require('./controllers/users'))

// errer handler
app.use(errorHandler)

module.exports = app
