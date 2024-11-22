const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),

        allBooks: async (root, args) => {

            if (args.author) {
                console.log('Author argument :', args.author);
                const author = await Author.findOne({
                    name: args.author
                });

                if (author) {
                    console.log('Author in database:', author.name);
                    return await Book.find({
                        author: author._id
                    }).populate('author');
                } else {
                    console.log('Author not found in database');
                    return []; // no books found 
                }
            }

            if (args.genre) {
                console.log('Genre argument provided:', args.genre);

                // Find books by genre
                return await Book.find({
                    genres: args.genre
                }).populate('author');

            } else {
                const books = await Book.find({}).populate('author')
                return books

            }
        },

        allAuthors: async (root, args) => {
            const authors = await Author.find({})
            const authorsWithBookCount = await Promise.all(authors.map(async (author) => {
                const bookCount = await Book.countDocuments({ author: author._id })
                return { ...author.toObject(), bookCount }
            }
            )
            )

            return authorsWithBookCount
        },

        me: (root, args, context) => {
            return context.currentUser
        },
    },

    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            console.log("context: ", context)
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            let author = await Author.findOne({
                name: args.author
            })

            if (!author) {
                console.log("author not found, adding new Author")
                author = new Author({
                    ...args,
                    name: args.author
                })

                try {
                    await author.save()
                } catch (error) {
                    throw new GraphQLError('Saving author failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error
                        }
                    })
                }
            }

            const book = new Book({ ...args, author: author })
            try {
                await book.save()
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            return book
        },

        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre
            })

            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating the user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.username,
                            error
                        }
                    })
                })
        },

        login: async (root, args) => {
            const user = await User.findOne({
                username: args.username
            });

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            const userForToken = {
                username: user.username,
                id: user.id,
            };

            return {
                value: jwt.sign(userForToken, process.env.JWT_SECRET)
            };
        },

        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }
            const author = await Author.findOne({
                name: args.name
            })
            author.born = args.setBornTo
            return author.save()
        }
    },

    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
}

module.exports = resolvers
