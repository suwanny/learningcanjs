/*
Controls

Listening to events
Templating event handlers
Rebinding events
Destroying Controls

Controls are organized, memory-leak free, performant, stateful UI controls. can.Control lets you create controls like tabs, grids, context menus, and forms, and helps you organize them into higher-order business units, tying them all together with can.route. Controls fill the traditional MVC controller role, managing data through Models made with can.Model and directing it to be displayed through views made with can.view.

Because Controls are a subclass of Constructs, you can create control constructors and instances just like with can.Construct. Here's what the constructor for a Control that manages a Todo list might look like:


*/

var Todos = can.Control({
  defaults: {
    view: '/views/todos1.mustache',
    destroyEvent: 'click'
  }
}, {
  init: function(el, options) {
    var self = this;
    Todo.findAll({}, function(todos) {
      self.todosList = todos;
      self.element.html(can.view(self.options.view, {
        todos: todos
      }));
    });
  },
  'li click': function(el, ev) {
    var li = el.closest('li'),
      todo = li.data('todo');
    console.log('You clicked ' + el.text());
    editor.todo(todo);
  },
  /*
  If a variable is placed in braces in the event handler key, can.Control will look up that key in the Control's options, and then on window. You can use this to customize the events that cause handlers to fire:
  */
  'li .destroy {destroyEvent}': function(el, ev) {
    var li = el.closest('li'),
      todo = li.data('todo');
    todo.destroy();
  },
  /*
  This is useful for listening to changes on models. 
  Say that our live-binding did not take care of removing <li>s after the corresponding Model was destroyed. 
  In that case, we could implement that functionality by listening to when Todos are destroyed:
  */
  '{Todo} destroyed': function(Todo, ev, destroyed) {
    // find where the element is in the list
    var index = this.todosList.indexOf(destroyed);
    if (index !== -1) {
      this.element.children(':nth-child(' + (index + 1) + ')').remove();
      this.todosList.splice(index, 1);
    } else {
      console.warn('not found destroyed!');
    }
  }
});

/*
To instantiate a control, pass it a selector, element, or library-wrapped NodeList that corresponds to the DOM element you want the Control to use as the containing element (which will be set to this.element for that Control). Also pass the control an object with any options for that particular instance. These options will be extended off of the Control's constructor's static defaults and set as this.options for that Control.

Here we'll initiate a Todos controller to hang off of the element with ID todos and with no options supplied:

*/
var todosList = new Todos('#todos', {
  view: 'views/todos1.mustache'
});

/*
If you specify a method called init when creating your Control's constructor, that method will be called when a new instance of that Control is created. The init method gets passed a library-wrapped NodeList containing this.element as the first parameter and this.options as the second parameter. Any other parameters you passed to the constructor during instantiation will also be passed to init.

To demonstrate this, here is another version of the Todo list Control constructor that can have its view overridden, and the instantiation of that Control:

Destroying the Todo will take it out of the list of Todos being rendered (because the list of Todos passed into the template is a Model List), which will cause the template to re-render itself. This means that live binding will remove the appropriate <li> automatically.

Templating event handlers
If a variable is placed in braces in the event handler key, can.Control will look up that key in the Control's options, and then on window. You can use this to customize the events that cause handlers to fire:

You can also use this to bind events to objects other that this.element within Controls. This is critical for avoiding memory leaks that are commonplace with other MVC applications and frameworks because it ensures that these handlers get unbound when the control is destroyed:
*/

var Tooltip = can.Control({
  '{window} click': function(el, ev) {
    // hide only if we clicked outside the tooltip
    if (!this.element.has(ev.target).length) {
      this.element.remove();
    }
  }
});

/*
This is useful for listening to changes on models. Say that our live-binding did not take care of removing <li>s after the corresponding Model was destroyed. In that case, we could implement that functionality by listening to when Todos are destroyed:
*/

/*
Rebinding events
You can unbind and rebind all a Control's event handlers by calling on on it. This is useful when a Control starts listening to a specific Model, and you want to change which model it is listening to.

In the example below, an Editor Control keeps a reference to the specific Todo it is editing. Its todo method calls on when the Todo being edited switches, because it needs to rebind {todo} updated.
*/
var Editor = can.Control({
  setDesc: function() {
    this.element.val(this.options.todo.description);
  },
  // change what Todo this Control points at
  todo: function(todo) {
    this.options.todo = todo;
    this.on();
    this.setDesc();
  },
  // listen for changes in the Todo
  '{todo} updated': function() {
    this.setDesc();
  },
  // when the input changes, update the Todo
  ' change': function(el, ev) {
    this.options.todo.attr('description', el.val());
    this.options.todo.save();
  }
});
var editor = new Editor('#editor');

// var todo1 = new Todo({
//   id: 7,
//   description: 'Take out the trash.'
// }),
//   todo2 = new Todo({
//     id: 8,
//     description: 'Wash the dishes.'
//   }),
//   editor = new Editor('#editor');
// // start editing the first Todo
// editor.todo(todo1);
// // switch to editing the second Todo
// editor.todo(todo2);

/*
Destroying Controls
Calling destroy on a Control unbinds the Control's event handlers and removes its association with its element, but it does not remove the element from the page.

However, when a Control's element is removed from the page, destroy is called on the Control.

Taken together, templated event binding and Control's automatic cleanup make it nearly impossible to write applications with memory leaks. An application that uses only templated event handlers on the controls within the body could free up all the data it uses by calling $(document.body).empty().

*/