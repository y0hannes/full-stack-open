const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { GraphQLError } = require('graphql');
const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');
require('dotenv').config();

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook (
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!

    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};
      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author });
        if (!foundAuthor) return [];
        filter.author = foundAuthor._id;
      }
      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }
      return await Book.find(filter).populate('author');
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const user = context.currentUser;
      if (!user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const existingBook = await Book.findOne({ title: args.title });
      if (existingBook) {
        throw new GraphQLError('Book already exists', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author, bookCount: 1 });
      } else {
        author.bookCount = (author.bookCount || 0) + 1;
      }

      try {
        await author.save();
      } catch (error) {
        console.error('Author save failed:', error);
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }

      const book = new Book({ ...args, author: author._id });
      try {
        await book.save();
        return await book.populate('author');
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }
    },

    editAuthor: async (root, args, context) => {
      const user = context.currentUser;
      if (!user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const foundAuthor = await Author.findOne({ name: args.name });
      if (!foundAuthor) {
        throw new GraphQLError('Author does not exist', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      foundAuthor.born = args.setBornTo;
      await foundAuthor.save();
      return foundAuthor;
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return await user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      const passwordCorrect = args.password === 'secret';

      if (!user || !passwordCorrect) {
        throw new GraphQLError('Wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(userForToken, process.env.JWT_SECRET);
      return { value: token };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.startsWith('Bearer ')) {
      try {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET
        );
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      } catch (error) {
        console.error('JWT verification failed:', error.message);
      }
    }
    return {};
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
