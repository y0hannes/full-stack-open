const oneBlog = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  likes: 5,
}


const listBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }
]

const gooduser = {
  username: 'kennad',
  name: 'Kenn Adams',
  password: 'kenngogo'
}

const userwithshortcredentials = {
  username: 'pe',
  name: 'peter Gregory',
  password: 'pg'
}

const initialUsers = [
  {
    username: 'user',
    name: 'user',
    password: 'secret'
  },
  {
    username: 'user2',
    name: 'user2',
    password: 'secret'
  },
]

const loginUser = {
  username: 'kennad',
  password: 'kenngogo'
}

const notUniqueUser = {
  username: 'kennad',
  name: 'Kenn Adams',
  password: 'kenngogo'
}

const userWithOutPassword = {
  username: 'user3',
  name: 'user3'
}

const loginWithWrongCredentials = {
  username: 'kennadd',
  password: 'kenngogo'
}

const loginWithOutPassword = {
  username: 'kennadd'
}

module.exports = {
  listBlogs,
  oneBlog,
  gooduser,
  userwithshortcredentials,
  initialUsers,
  loginUser,
  notUniqueUser,
  userWithOutPassword,
  loginWithWrongCredentials,
  loginWithOutPassword
}