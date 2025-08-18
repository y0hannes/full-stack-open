const express = require('express')
const Blog = require('../models/blog')
const router = express.Router()

router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
  }
  catch (err) {
    console.log(err)
    res.status(400).json({ err: err.message })
  }
})

router.post('/blogs', async (req, res) => {
  try {
    const body = req.body

    const blog = new Blog(body)
    const savedBlog = await blog.save()

    res.status(201).json(savedBlog)
  } catch (err) {
    response.status(400).json({ err: err.message })
  }
})

module.exports = router