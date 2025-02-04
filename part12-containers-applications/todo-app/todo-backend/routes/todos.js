const express = require('express');
const { Todo } = require('../mongo');

const router = express.Router();

router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false
    })
    res.send(todo);
  }
  catch (error) {
    res.status(500).json({ error: 'Could not create todo' })
  }
});

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

// Apply the middleware to all routes that use an ID
router.use('/:id', findByIdMiddleware)

/* DELETE todo. */
router.delete('/:id', async (req, res) => {
  await req.todo.deleteOne()
  res.sendStatus(200);
});

/* GET todo. */
router.get('/:id', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
router.put('/:id', async (req, res) => {
  try {
    const { text, done } = req.body;
    if (text !== undefined) req.todo.text = text;
    if (done !== undefined) req.todo.done = done;

    const updatedTodo = await req.todo.save();
    res.send(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).send({ error: 'Failed to update todo', details: error.message });
  }
});

module.exports = router;

