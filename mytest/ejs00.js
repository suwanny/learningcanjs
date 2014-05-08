

<script type="text/ejs" id="todoList">
<% for(var i = 0; i < todos.length; ++i) { %>
    <li><%= this[i].attr('description') </li>
<% } %>
</script>


Todo.findAll({}, function(todos) {
    document.getElementById('list')
        .appendChild(can.view('todoList', todos)); // todos becomes this!!!
});

// As you can see from the template and the call to can.view, the todos object becomes this inside the template. 

<script type="text/ejs" id="todosAndUser">
<h2> <%= user.attr('name') %></h2>
<% for(var i = 0; i < todos.length; ++i) { %>
    <li><%= this[i].attr('description') </li>
<% } %>
</script>

// Which can be inserted in the document with:

can.view('todosAndUser', {
    todos: Todo.findAll(),
    user: User.findOne({id: 5})
}).then(function(frag) {
    document.getElementById('todos').appendChild(fragment);
});


// Magic tags
// There are five kinds of magic tags used in EJS:

// <% %> will run any JavaScript code inside of it. This tag doesn't modify or populate the template, but allows you to use for loops, if/else statements, switch statements, and variable declarations inside the EJS template. Because almost any JavaScript code is valid in <% %>, EJS is incredibly powerful.

// <%= %> will evaluate a JavaScript statement and write the HTML-escaped result into the populated template. 

// <%== %> will evaluate a JavaScript statement and write the raw result into the populated template. 




// Live binding
// Live binding will automatically update your EJS templates in the DOM whenever the data they are populated with changes. To do this, populate your templates with Observes and use attr to read properties. In this template, using attr sets up live binding on the description property of todo:

<li><%= todo.attr('description') %></li>

// If you change the Todo's description, the template's output will automatically update:
todo.attr('description', 'Clean up the bathroom.');

// You can fix this by using a closure and the each method of Observes:
// each will also watch the length of the list it is passed, so elements are added or removed from it, it will update the output of the template.
<% todos.each(function() { %>
    <li><%= todo.attr('name') %></li>
<% }); %>

// Element callbacks

<img src="surprise.gif" <%= function(element) { element.style.display = 'none'; } %>/>
<img src="surprise.gif" <%= (el) -> el.hide() %>/>

// You can use this functionality to easily attach data to an element. 
// A common reason to do this is to attach a Model to the element that represents it:
<% todos.each(function(todo) { %>
<li <%= (el) -> can.data(el, 'todo', todo) %>>
    <%= todo.attr('description') %>
</li>
<% }) %>

