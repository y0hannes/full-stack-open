const express = require('express')

const app = express()
app.use(express.json())

app.use('/api/blogs', require('./controllers/blogs'))
app.use('/api/users', require('./controllers/users'))

module.exports = app

// const errorHandler = (error, request, response, next) => {
//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
//     return response.status(400).json({ error: 'expected `username` to be unique' })

//   } else if (error.name ===  'JsonWebTokenError') {
//     return response.status(401).json({ error: 'token invalid' })
//   }

  // } else if (error.name === 'TokenExpiredError') {    return response.status(401).json({      error: 'token expired'    })  }

//   next(error)
// }