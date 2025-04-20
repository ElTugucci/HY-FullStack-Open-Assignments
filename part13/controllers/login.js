const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User, ActiveSession } = require('../models')

router.post('/', async (request, response, next) => {
  const body = request.body
  try {
    const user = await User.findOne({
      where: {
        username: body.username
      }
    })


    const passwordCorrect = body.password === 'secret'

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    if (user.disabled) {
      return response.status(401).json({
        error: 'User disabled. Please contact admin.'
      })
    }

    const userForToken = {
      username: user.username,
      id: user.id
    }

    const token = jwt.sign(userForToken, SECRET)

    await ActiveSession.create({
      userId: userForToken.id,
      token: token
    })

    response
      .status(200)
      .send({ token: token, username: user.username, name: user.name })
  } catch (error) {
    next(error)
  }
})


module.exports = router
