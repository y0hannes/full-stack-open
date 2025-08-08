const express = require('express')
const connectDB = require('./utils/config')

const app = express()
app.use(express.json())

connectDB()

app.use('/api', require('./controllers/blogs'))

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})