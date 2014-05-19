var _ = require('lodash');
var express = require('express');
var todos = [{
  "id": 1,
  "description": "Do the dishes.."
}, {
  "id": 2,
  "description": "Mow the lawn."
}, {
  "id": 3,
  "description": "Finish the laundry."
}],
  nextId = 4;

var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {
  // log each request to the console
  console.log('Todos: ', req.method, req.url);
  // continue doing what we were doing and go to the route
  next();
});

router.get('/', function(req, res, next) {
  res.json({
    success: true,
    data: todos,
    total: todos.length,
    updated_at: new Date()
  });
});

router.post('/', function(req, res, next) {
  var newTodo = _.extend({}, req.body, {
    id: nextId++
  });
  console.dir(newTodo);
  todos.push(newTodo);
  res.json(newTodo);
});

router.get('/:id', function(req, res, next) {
  res.json(_.findWhere(todos, {
    id: +req.params.id
  }));
})

router.put('/:id', function(req, res, next) {
  var todo = _.findWhere(todos, {
    id: +req.params.id
  });
  todo = req.body;
  res.json(_.findWhere(todos, {
    id: +req.params.id
  }));
});

router.delete('/:id', function(req, res, next) {
  var todo = _.findWhere(todos, {
    id: +req.params.id
  });
  if (todo) {
    todos.splice(todos.indexOf(todo), 1);
  }
  res.json(todo);
});

module.exports = router;