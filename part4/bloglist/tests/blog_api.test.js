const { test, after, describe, before, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const { oneBlog, gooduser, loginUser } = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const connectDB = require('../utils/config')

const api = supertest(app)
let token = ''

before(async () => {
  await connectDB()
})

describe('When there is initially one user and no blogs', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    // create a user
    await api
      .post('/api/users')
      .send(gooduser)
      .expect(201)

    // login and get token
    const response = await api
      .post('/api/login')
      .send({
        username: gooduser.username,
        password: gooduser.password
      })
      .expect(200)

    token = response.body.token
    // create a blog
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(oneBlog)
      .expect(201)

  })

  test('blogs count is correct initially', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 1)
  })

  test('a valid blog can be added', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const newBlog = {
      title: 'Async/Await makes life easier',
      author: 'Tester',
      url: 'http://example.com/async',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length + 1)

    const titles = blogsAtEnd.body.map(r => r.title)
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 1)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'No URL here',
      author: 'NoURL',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 1)
  })

  describe('and a blog exists', () => {
    let blogToUpdate
    beforeEach(async () => {
      const newBlog = {
        title: 'A blog to update and delete',
        author: 'Test Author',
        url: 'http://example.com/test',
        likes: 5,
      }
      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
      blogToUpdate = response.body
    })

    test('successfully updates likes of a blog', async () => {
      const updatedBlogData = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedBlogData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
    })

    test('deleting a blog succeeds with status 204 if id is valid', async () => {
      const blogsAtStart = await api.get('/api/blogs')

      await api
        .delete(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await api.get('/api/blogs')
      assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1)

      const ids = blogsAtEnd.body.map(r => r.id)
      assert(!ids.includes(blogToUpdate.id))
    })
  })

  test('updating a blog returns 404 if blog does not exist', async () => {
    const validNonexistingId = new mongoose.Types.ObjectId()
    const updatedBlog = {
      title: 'does not exist',
      author: 'nobody',
      url: 'http://none.com',
      likes: 0
    }

    await api
      .put(`/api/blogs/${validNonexistingId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedBlog)
      .expect(404)
  })

  test('deleting a blog returns 404 if blog does not exist', async () => {
    const validNonexistingId = new mongoose.Types.ObjectId()

    await api
      .delete(`/api/blogs/${validNonexistingId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })

  describe('token related tests', () => {
    test('creating a blog fails with 401 if no token is provided', async () => {
      const newBlog = {
        title: 'Unauthorized blog',
        author: 'Nobody',
        url: 'http://unauth.com',
        likes: 1,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await api.get('/api/blogs')
      assert.strictEqual(blogsAtEnd.body.length, 1)
    })

    test('updating a blog fails with 401 if no token is provided', async () => {
      const blogsAtStart = await api.get('/api/blogs')
      const blogToUpdate = blogsAtStart.body[0]

      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(401)
    })

    test('deleting a blog fails with 401 if no token is provided', async () => {
      const blogsAtStart = await api.get('/api/blogs')
      const blogToDelete = blogsAtStart.body[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)

      const blogsAtEnd = await api.get('/api/blogs')
      assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length)
    })

    test('a user cannot update a blog created by another user', async () => {

      const anotherUser = {
        username: 'second',
        name: 'Second User',
        password: 'password123'
      }
      await api.post('/api/users').send(anotherUser).expect(201)

      const loginRes = await api.post('/api/login').send({
        username: anotherUser.username,
        password: anotherUser.password
      }).expect(200)

      const secondToken = loginRes.body.token

      const blogsAtStart = await api.get('/api/blogs')
      const blogToUpdate = blogsAtStart.body[0]

      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 10 }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${secondToken}`)
        .send(updatedBlog)
        .expect(401)

      assert.strictEqual(response.body.error, 'This user cannot modify this blog')
    })

    test('a user cannot delete a blog created by another user', async () => {
      const anotherUser = {
        username: 'second2',
        name: 'Second User',
        password: 'password123'
      }
      await api.post('/api/users').send(anotherUser).expect(201)

      const loginRes = await api.post('/api/login').send({
        username: anotherUser.username,
        password: anotherUser.password
      }).expect(200)

      const secondToken = loginRes.body.token

      const blogsAtStart = await api.get('/api/blogs')
      const blogToDelete = blogsAtStart.body[0]

      const response = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${secondToken}`)
        .expect(401)

      assert.strictEqual(response.body.error, 'This user cannot delete this blog')

      const blogsAtEnd = await api.get('/api/blogs')
      assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length)
    })

  })
})

after(async () => {
  await mongoose.connection.close()
})