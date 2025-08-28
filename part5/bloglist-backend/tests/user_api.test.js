const { test, after, describe, before, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user')
const app = require('../app')
const connectDB = require('../utils/config')

const {
  gooduser,
  userwithshortcredentials,
  initialUsers,
  loginUser,
  notUniqueUser,
  userWithOutPassword,
} = require('./test_helper')

const api = supertest(app)

before(async () => {
  await connectDB()
})

describe('users can create account', () => {
  beforeEach(async () => {
    await User.deleteMany({})

  })

  test('account is created with good credentials', async () => {
    const usersAtStart = await api.get('/api/users')

    await api
      .post('/api/users')
      .send(gooduser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length + 1)
  })

  test('user with short password length is not created', async () => {
    const usersAtStart = await api.get('/api/users')

    await api
      .post('/api/users')
      .send(userwithshortcredentials)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length)
  })

  test('non unique user can not be created', async () => {
    const usersAtStart = await api.get('/api/users')

    await api
      .post('/api/users')
      .send(gooduser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/users')
      .send(notUniqueUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length + 1)
  })

  test('user with out password is not created', async () => {
    const usersAtStart = await api.get('/api/users')

    await api
      .post('/api/users')
      .send(userWithOutPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length)
  })

})

after(async () => {
  await mongoose.connection.close()
})