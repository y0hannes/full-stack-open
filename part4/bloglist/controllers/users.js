const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const express = require('express')

userRouter = express.Router()

userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const passwordVerified = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordVerified)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: username,
    userId: user._id
  }

  const token = jwt.sign(userForToken, process.env.JWT_SECRET_KEY)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })

})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate(
    'blogs',
    { title: 1, url: 1, likes: 1 }
  )
  response.json(users)
})

userRouter.post('/', async (req, res, error) => {
  try {
    const { username, name, password } = req.body
    if (username.length < 3 || password.length < 3) {
      return res.status(400).json({ error: 'Both username and password should be longer that 3 characters' })
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