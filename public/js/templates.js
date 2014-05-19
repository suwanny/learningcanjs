/*
Templates page Templates
 
- Loading templates
- Passing Deferreds
- Rendering to string

can.view loads and renders templates with the data you provide, and returns a documentFragment with the populated template. can.view supports many templating languages, but EJS and [Mustache Mustache] allow you to live bind to Observes within templates. Live binding will dynamically update your template in the DOM automatically whenever the properties within Observes change.

Loading templates
You can load templates from a URL or directly from an existing script tag. To load from a script tag, pass can.view the tag's ID as the first parameter. To load from a URL, pass the URL as the first parameter. Use the second parameter to pass the data to populate the template with.

In order to register a template with can.view, create a script tag on the page with an ID, a type attribute that matches the templating language, and the content of the template inside:

<script type="text/ejs" id="todoList">
  <ul>
  <% can.each(this, function(val, key) { %>
      <li><%= val.attr('id') %> - <%= val.attr('description') %></li>
  <% }); %>
  </ul>
 </script>

*/


// Todo.findAll({}, function(todos) {
//   $('#nav').html(can.view('todoList', todos))
// });

Todo.findAll({}, function(todos) {
  window.todos = todos;
  $('#todos').html(can.view('views/todos.ejs', {
    todos: todos
  }));
});

/*
Passing Deferreds
If the second parameter you pass to can.view contains Deferreds, can.view will instead return a Deferred that resolves to the documentFragment containing the populated template after all the deferreds have resolved.

This aspect is most useful because [Model] methods like findAll return a Deferred. This allows you to load a template, retrieve one or more Models, and then render the resulting documentFragment after everything has been loaded:
*/

// var todos = Todo.findAll();
// can.view('views/todos.ejs', {todos: todos})
//   .then(function(fragment) {
//     document.getElementById('todos').appendChild(fragment);
//   });

/*
Rendering to string
To render to a string instead of a documentFragment, use can.view.render. This is mainly used to nest templates inside of other templates:

<% can.each(todos, function(todo, key) { %>
    <li><%== can.view.render('todo.ejs', todo); %></li>
<% }) %>

todos[0].attr('description', 'Hey Yo');

Element callbacks
If the code inside <%= %> or <%== %> evaluates to a function, the function will be called back with the element it's inside as its first argument. This is useful to initialize functionality on an element within the template, like starting an element hidden:


*/