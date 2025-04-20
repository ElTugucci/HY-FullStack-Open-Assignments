const router = require('express').Router()

const { where } = require('sequelize')
const { ReadingList, User, Blog } = require('../models')

const { tokenExtractor, checkSession, blogFinder } = require('../util/middleware')

router.get('/', async (req, res, next) => {
  try {
    const readinglist = await ReadingList.findAll()
    res.json(readinglist);
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      where: {
        id: req.body.blogId
      }
    })

    const user = await User.findOne({
      where: {
        id: req.body.userId
      }
    })

    const blogInReadingList = await ReadingList.findOne({
      where: {
        userId: req.body.userId,
        blogId: req.body.blogId
      }
    })

    if (!blog || !user) {
      res.status(400).json({ message: 'Blog or User not found' })
    }
    // check if blog is already in the reading list
    if (!blogInReadingList) {
      const readinglistBlog = await ReadingList.create(req.body)
      res.json(readinglistBlog)
    }
    else {
      res.status(400).json({ message: 'Blog is already in reading list' })
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, checkSession, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);

    const readinglistBlog = await ReadingList.findOne({
      where: {
        id: req.params.id
      }
    })

    if (readinglistBlog && readinglistBlog.userId === user.id) {
      readinglistBlog.read = req.body.read
      await readinglistBlog.save()
      res.json(readinglistBlog)
    } else {
      res.status(404).json('The blog is not in your reading list')
    }
  }
  catch (error) {
    next(error)
  }
})

module.exports = router
