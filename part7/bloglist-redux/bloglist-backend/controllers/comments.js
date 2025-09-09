const express = require('express')
const Comment = require('../models/comment')
const Blog = require('../models/blog')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('comments')
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }
    const comments = blog.comments
    return res.status(201).json({ comments })
  }
  catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { content } = req.body
    if (!content) {
      return res.status(400).json({ error: 'Comment content is missing' })
    }

    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }
    const newComment = new Comment({
      blog: req.params.id,
      content: content
    })
    const savedComment = await newComment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    return res.status(201).json(savedComment)
  }
  catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router