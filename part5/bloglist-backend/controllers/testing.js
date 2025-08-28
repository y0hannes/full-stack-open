const Blog = require('./models/blog')
const User = require('./models/user')

const express = require('express')
const router = express.Router()

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
})

module.exports = router