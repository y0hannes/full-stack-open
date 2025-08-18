const app = require('./app')
const connectDB = require('./utils/config')

const setupDB = async () => await connectDB()
setupDB()

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
