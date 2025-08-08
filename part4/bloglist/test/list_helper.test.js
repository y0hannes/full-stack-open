const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')
const { oneBlog, listBlogs } = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = oneBlog
    const result = totalLikes(blogs)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = listBlogs
    const result = totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', ()=> {
  test('when list has only one blog equals the likes of that', () => {
    const blogs = oneBlog
    const result = favoriteBlog(blogs)
    assert.deepStrictEqual(result, oneBlog[0])
  })

  test('of a bigger list is calculated right', () => {
    const blogs = listBlogs
    const result = favoriteBlog(blogs)
    assert.deepStrictEqual(result, listBlogs[2])
  })
})

describe('most blogs', () => {
  test('of a bigger list is calculated right', () => {
    const blogs = listBlogs
    const result = mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('of a bigger list is calculated right', () => {
    const blogs = listBlogs
    const result = mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})