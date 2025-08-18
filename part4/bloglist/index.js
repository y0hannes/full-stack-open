const app = require('./app')
const connectDB = require('./utils/config')

await connectDB()

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
