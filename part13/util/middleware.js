const jwt = require('jsonwebtoken')
const { SECRET } = require('./config.js')
const { ActiveSession, User, Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {

    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const checkSession = async (req, res, next) => {
  if (!req.decodedToken || !req.decodedToken.id) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const user = await User.findOne({
    where: {
      id: req.decodedToken.id
    }
  })

  const session = await ActiveSession.findOne({
    where: {
      user_id: user.id
    }
  })

  if (session && user.disabled) {
    try {
      await ActiveSession.destroy({
        where: {
          user_id: user.id
        }
      })
      return res.status(401).json({ error: 'Session deleted for disabled user' })
    } catch (error) {
      return res.status(401).json({ error: `Deleting session for disabled user failed ${error}` })
    }
  }
  if (!session) {
    return res.status(401).json({ error: 'You are not authorized to perform this action' })
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error('Error:', error.name)
  console.error('Message:', error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Malformatted ID' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).json({ error: 'Unique constraint violation', details: error.errors })
  }

  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return response.status(400).json({ error: 'Invalid foreign key reference', details: error.fields })
  }

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({ error: 'Database error', message: error.message })
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token' })
  }

  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Token expired' })
  }

  next(error)

  return response.status(500).json({ error: 'Internal server error', message: error.message })
}


module.exports = { tokenExtractor, checkSession, errorHandler, blogFinder }
