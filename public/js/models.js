/*

Models are special Observes that connect to RESTful services. They come with a set of methods designed to make it easy to manage changes remotely. To create a Model class, call can.Model and supply it with specific static properties that tell it how to interact with the server, along with any prototype properties or helper methods the Model may need. The important static properties are:

- findAll, which describes how to get a group of items.
- findOne, which describes how to get a specific item.
- create, which describes how to save a new item.
- update, which describes how to update an existing item.
- destroy, which describes how to delete an item.
When accessing a straightforward RESTful API, creating a Model class and an instance of that Model class might be as simple as this:

Because Models are Observes, don't forget to set all your properties using attr.
*/



var Todo = can.Model({
  findAll: 'GET /todos',
  findOne: 'GET /todos/{id}',
  create: 'POST /todos',
  update: 'PUT /todos/{id}',
  destroy: 'DELETE /todos/{id}'
}, {});
// var dishesTask = new Todo({
//   description: 'Do the dishes.'
// });

/*

# Talking to the server

By supplying the findAll, findOne, create, update, and destroy properties, you show a Model class how to communicate with the server. You can call findAll and findOne on the Model class to retrieve Models and save and destroy on Models to create, update, and delete them.

Retrieving items from a server

can.Model.findAll retrieves a group of Models by making a call to a server. Here's how you call findAll on our Todo class above:

*/

// Todo.findAll({}, function(todos) {
//     // todos is a can.Model.List of Todo Models.
//     console.dir(todos);
// }, function(xhr) {
//     // handle errors
// });

/*
findAll returns a can.Deferred that will resolve to a Model List of items if the call succeeds and rejects to the XmlHttpRequest object if there is an error.

can.Model.findOne works similarly to findAll, except that it retrieves a single Model from a service:

findOne returns a Deferred that resolves to the Todo if the call succeeds and rejects to the XmlHttpRequest object if there is an error.
*/

// Todo.findOne({id: 1}, function(todo) {
//     console.dir(todo);
// });



// Todo.bind('created', function(ev, created) {
//   // created is the created Todo
//   console.log('Todo created ----------------------------- ');
//   console.dir(ev);
//   console.dir(created);
// });

// Todo.bind('destroyed', function(ev, created) {
//   console.log('Todo destroyed ----------------------------- ');
//   console.dir(ev);
//   console.dir(created);
// });


/*
# Modifying items

You can call save on a Model instance to save it back to the server. If the Model has an **id**, it will be updated using the function specified under update. Otherwise, can.Model assumes the Model is new and creates the item on the server using the function in create.

Either way, the success callback in the first parameter will be called on a successful save with the updated Model; if an error occurs, the error callback in the second parameter will be called with the XmlHttpRequest object. Like findAll, save returns a Deferred that resolves to the updated Model on success and rejects to the XmlHttpRequest object on failure.

In the code below, the first time shopping.save() is called, can.Model will make a POST request to /todos with a request body of description=Go grocery shopping.. When the response comes back, it should have an id (say, 5) and that id property will be reflected in todo.

The second time saved.save() is called, saved has an id, so can.Model will make a PUT request to /todos/5 with a request body of description=Remember the milk..
*/

// var shopping = new Todo({description: "Go grocery shopping."});
// shopping.save(function(saved) {
//     // saved is the saved Todo
//     saved.attr('description', 'Remember the milk.');
//     saved.save();
//     console.dir(saved);
// });

/*
# Deleting items

When you need to delete a Model's counterpart on the server, just call destroy on the Model, passing it success and error handlers just like save, except that the success handler will be passed the Model that has been deleted. destroy also retuns a Deferred, which resolves to the deleted Model and rejects to the XmlHttpRequest object.

When destroy is called in the above code, can.Model makes a DELETE request to /todos/6.
*/

// var cats = new Todo({
//   description: "Feed the cats."
// });
// cats.save(function(saved) {
//   console.log('saved cats ..........')
//   saved.destroy(function(destroyed) {
//     // destroyed is the Todo that was destroyed
//     // console.dir(destroyed);
//   });
// });

/*
# Listening to events
Because Models are Observes, you can bind to the same events as on any other Observe. In addition to those events, Models emit three new kinds of events:

- created, when an instance is created on the server.
- updated, when an instance is updated on the server.
- destroyed, when an instance is destroyed on the server.

For example, here is how you listen for an instance being created on the server:

*/

// var mop = new Todo({
//   description: 'Mop the floor.' + new Date()
// });
// // mop.bind('created', function(ev) {
// //   // created is the created Todo
// //   console.log('mob created ---------------------')
// //   console.log('created', ev);
// // });
// mop.save();

/*
# Model Lists
Model Lists (provided by can.Model.List) are Lists whose items are Models. When one of a Model List's elements are destroyed, that element is removed from the list.
*/



// Todo.findAll({}, function(todos) {
//   console.log('length: ', todos.length); // 
//   var oldLen = todos.length;
//   todos[0].destroy(function() {
//     if (todos.length === oldLen) {
//       console.error('destory does not reduce can.Model.List.length: ', todos.length); //
//     }
//   });
// });


console.log('');