const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')

const { tokenExtractor, checkSession, blogFinder } = require('../util/middleware')

router.get('/', async (req, res, next) => {
  const where = {}
  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`
        }
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }
    ]
  }
  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name']
      },
      where,
      order: [
        ['likes', 'DESC']
      ]
    })
    res.json(blogs)
  } catch (error) {
    next(error)
  }

})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', blogFinder, tokenExtractor, checkSession, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)

  if (req.blog && req.blog.userId === user.id) {
    await req.blog.destroy();
    return res.status(200).json({ message: `Blog ${req.blog.id} deleted` });
  } else {
    return res.status(403).json({ error: 'You are not authorized to delete this blog' });
  }
});

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes
  await req.blog.save()
  res.json(req.blog)
})

module.exports = router
