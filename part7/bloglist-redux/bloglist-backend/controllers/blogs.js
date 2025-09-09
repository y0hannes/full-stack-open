const express = require('express')
const Blog = require('../models/blog')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
      .populate(
        'user',
        { username: 1, name: 1 }
      )
      .populate('comments', { content: 1 })
    res.status(200).json(blogs)
  }
  catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body

    if (!title || !url) {
      return res.status(400).end()
    }

    if (!req.user) {
      return res.status(401).json({ error: 'invalid token' })
    }

    const user = req.user

    const newBlog = new Blog({ title, author, url, likes, user: user.id })
    const savedBlog = await newBlog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    res.status(201).json(savedBlog)

  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const user = req.user
    const blogId = req.params.id
    const blog = await Blog.findById(blogId)

    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() === user.id.toString()) {
      const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true })
      res.status(200).json(updatedBlog)
    }
    else {
      res.status(401).json({ error: 'This user cannot modify this blog' })
    }
  }
  catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const blogId = req.params.id
    const user = req.user
    const blog = await Blog.findById(blogId)

    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(blogId)
      res.status(204).end()
    } else {
      res.status(401).json({ error: 'This user cannot delete this blog' })
    }
  }
  catch (error) {
    next(error)
  }
})

module.exports = router
