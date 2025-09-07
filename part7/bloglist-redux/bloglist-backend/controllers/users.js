const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const express = require('express')

userRouter = express.Router()

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate(
    'blogs',
    { title: 1, url: 1, likes: 1 }
  )
  res.json(users)
})

userRouter.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body

    if (!password || password.length < 3) {
      return res.status(400).json({ error: 'Password is required and must be at least 3 characters long' })
    }

    if (!username || username.length < 3) {
      return res.status(400).json({ error: 'Username is required and must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = new User({
      username,
      name,
      passwordHash,
    })

    const userSaved = await newUser.save()
    res.status(201).json(userSaved)

  }
  catch (error) {
    next(error)
  }
})

module.exports = userRouter