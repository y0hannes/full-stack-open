const { test, after, describe, before, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const { listBlogs } = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
const connectDB = require('../utils/config')

const api = supertest(app)

before(async () => {
  await connectDB()
})

describe('When there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of listBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('blogs count is correct', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, listBlogs.length)
  })

  test('blog posts have property "id" (not "_id")', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    assert.ok(blog.id, 'blog should have an id property')
    assert.strictEqual(blog._id, undefined, 'blog should not have _id property')
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Async/Await makes life easier',
      author: 'Tester',
      url: 'http://example.com/async',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, listBlogs.length + 1)

    const titles = response.body.map(r => r.title)
    assert(titles.includes('Async/Await makes life easier'))
  })

  test('if likes property is missing, defaults to 0', async () => {
    const newBlog = {
      title: 'No likes yet',
      author: 'Anonymous',
      url: 'http://nolikes.com'
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.likes, 0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'NoTitle',
      url: 'http://notitle.com',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, listBlogs.length)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'No URL here',
      author: 'NoURL',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, listBlogs.length)
  })

})

after(async () => {
  await mongoose.connection.close()
})