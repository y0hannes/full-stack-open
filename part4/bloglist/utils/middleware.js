const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  } else {
    req.token = null
  }

  next()
}

const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, secretWord)
    if (!decodedToken.id) {
      req.user = null
    }
    req.user = await User.findById(decodedToken.id)
  }

  next()
}

module.exports = {
  tokenExtractor,
  userExtractor
}