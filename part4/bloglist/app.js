const express = require('express')

const app = express()
app.use(express.json())

// middlewares 
const { tokenExtractor, userExtractor } = require('./utils/middleware')
app.use(tokenExtractor)
app.use(userExtractor)

app.use('/api/blogs', require('./controllers/blogs'))
app.use('/api/users', require('./controllers/users'))

module.exports = app
