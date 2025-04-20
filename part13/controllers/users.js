const router = require('express').Router()

const { User, Blog } = require('../models')

const { tokenExtractor } = require('../util/middleware')

const { Op } = require('sequelize')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
      }
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let read = {
      [Op.in]: [true, false]
    }
    if (req.query.read) {
      read = req.query.read === "true"
    }

    const user = await User.findByPk(req.params.id, {
      include: [{
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId'] },
        through: {
          as: 'reading_list',
          attributes: { exclude: ['blogId', 'userId'] },
          where: {
            read
          }
        },
      }]
    })
    if (user) {
      res.json(user)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:username', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })

    if (user) {
      user.username = req.body.username
      await user.save()
      res.json(user)
    } else {
      res.status(400).json({ message: 'User not found' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
