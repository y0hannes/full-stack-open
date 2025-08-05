require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const connectDB = require('./db')

const app = express()
connectDB()
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :body'))
app.use(express.static('dist'))

app.use('/api', require('./routes'))

const errorHandler = require('./errorHandler')
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})