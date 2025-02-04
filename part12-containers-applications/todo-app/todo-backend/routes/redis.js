const express = require('express')
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require('../redis')

const router = express.Router()


router.get('/statistics', async (_, res) => {
  const count = await getAsync('count')
  return res.json({ added_todos: count || '0' })
})

router.post('/redis', async (req, res) => {
  const toDoCounter = async () => {
    const count = await getAsync("count")
    return count ? setAsync("count", parseInt(count) + 1) : setAsync("count", 1)
  }

  toDoCounter()

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo)
})

module.exports = router

