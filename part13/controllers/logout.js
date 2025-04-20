const router = require('express').Router()

const { ActiveSession } = require('../models')
const { tokenExtractor, checkSession } = require('../util/middleware')

router.delete('/', tokenExtractor, checkSession, async (req, res, next) => {
  try {
    await ActiveSession.destroy({
      where: {
        user_id: req.decodedToken.id
      }
    })
    res.status(200).json({ message: 'log out complete' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
