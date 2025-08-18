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
    res.status(400).json({ err: err.message })
  }
})

router.put('/blogs/:id', async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (updated) {
      res.status(200).json(updated)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({ error: 'malformatted id' })
  }
})

router.delete('/blogs/:id', async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id)
    if (deleted) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).json({ error: 'malformatted id' })
  }
})


module.exports = router
