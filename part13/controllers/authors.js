const router = require('express').Router()
const { fn, col } = require('sequelize')
const { Blog } = require('../models')

router.get('/', async (res, next) => {
  try {
    const blogs = await Blog.findAll({
      attributes:
        [
          'author',
          [fn('COUNT', col('id')), 'articles'],
          [fn('SUM', col('likes')), 'likes']
        ],
      group: 'author',
      order: [
        ['likes', 'DESC']
      ]
    })
    res.json(blogs)
  }
  catch (error) {
    next(error)
  }
})


module.exports = router
