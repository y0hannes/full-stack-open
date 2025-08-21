const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
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

module.exports = loginRouter