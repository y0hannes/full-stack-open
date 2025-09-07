const { test, describe, before, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user')
const app = require('../app')
const connectDB = require('../utils/config')

const {
  gooduser,
  loginUser,
  loginWithWrongCredentials,
  loginWithOutPassword
} = require('./test_helper')

const api = supertest(app)

before(async () => {
  await connectDB()
})

describe('login tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    await api
      .post('/api/users')
      .send(gooduser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('user can login with correct credentials', async () => {
    const response = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.ok(response.body.token, "Expected a JWT token in response")
    assert.strictEqual(response.body.username, loginUser.username)

  })

  test('user can not login with wrong credentials', async () => {
    const response = await api
      .post('/api/login')
      .send(loginWithWrongCredentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

    test('user can not login without password', async () => {
    const response = await api
      .post('/api/login')
      .send(loginWithOutPassword)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

})

after(async () => {
  await mongoose.connection.close()
})