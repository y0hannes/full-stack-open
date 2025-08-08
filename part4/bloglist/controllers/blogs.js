const express = require('express')
const Blog = require('../models/blog')
const router = express.Router()

router.get('/blogs', (req, res) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs)
    })
    .catch(error => console.log(error))
})

router.post('/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog.save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch(error => console.log(error))
})

module.exports = router