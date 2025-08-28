const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const favorite = blogs.reduce((mostLiked, current) =>
    mostLiked.likes > current.likes ? mostLiked : current
  )
  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  const topAuthor = Object.keys(authorCounts).reduce((a, b) =>
    authorCounts[a] > authorCounts[b] ? a : b
  )

  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorLikes = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes
    return likes
  }, {})

  const topAuthor = Object.keys(authorLikes).reduce((a, b) =>
    authorLikes[a] > authorLikes[b] ? a : b
  )

  return {
    author: topAuthor,
    likes: authorLikes[topAuthor]
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }