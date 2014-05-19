/*

Mustache

Magic tags
Helpers
Partials
Mustache is a logic-less templating languages [which provide live binding when used with Observes. CanJS's Mustache implementation supports both normal Mustache templates as well as the Handlebars extensions, allowing you to easily reuse templates that you've already written.

Mustache templates are essentially straight HTML, except that they contain special tags used for injecting your data into the HTML. The number of ways you can inject data is limited by design for simplicity and maintainability, but can be enhanced through the use of helpers.

Here's an example of a template that might render a list of Todos:

*/

var sampleUser = {
  name: 'Alice Liddell',
  nickname: '',
  friends: ['Bob', 'Eve'],
  enemies: []
};

var siblings = {
  brothers: [{
    name: 'Bob'
  }, {
    name: 'David'
  }],
  sisters: [{
    name: 'Alice'
  }, {
    name: 'Eve'
  }]
};

Todo.findAll({}, function(todos) {
  window.todos = todos;
  document.getElementById('todos')
    .appendChild(
      can.view('/views/todos.mustache', {
        todos: todos,
        user: sampleUser,
        siblings: siblings
      }, {
        uppercase: function(val) {
          if (typeof val === 'function') {
            return val().toUpperCase();
          } else {
            return val.toUpperCase();
          }
        },
        addMs: function(val) {
          return 'Ms. ' + val();
        }
      })
  );
});

/*
Magic tags
There are three kinds of magic tags used in Mustache:

{{ }} will HTML-escape the value enclosed inside the tags and write it to the template.
{{{ }}} will write the value enclosed inside the tags directly to the template without escaping it.
{{! }} is a comment that writes nothing to the template.
Variables

Variable tags insert data into the template. They reference variables in the current context.

This template:

Sections

Sections contain text blocks and are conditionally rendered based on the variable enclosed in the opening tag. They also change the active context inside them to that of the variable referenced in the opening tag.

For the following examples, we will assume the template is being populated with this set of data:

Context

When Mustache is resolving an object in a section, it sets the current context to the object value for which it is iterating. (If the variable in the opening tag of a section was not an array, it sets the context to the value of that variable.) You can reference the current context as ..

Internally, Mustache keeps a stack of contexts as the template enters nested sections and helpers. If a variable is not found in the current context, Mustache will look for the the in each successive parent context until it resolves the variable or runs out of parent contexts.

For example, with this data:

Since there is no sisters variable in the context of the elements of the brothers array, Mustache jumps up to the parent context and resolves sisters there.
*/

/*
# Helpers

Mustache lets you register functions to be called from inside the template called helpers. Since Mustache templates are logic-less, all of your view logic will either be manipulated outside of the template or it will be inside a helper.

To use a helper that is local to the template you're rendering, pass it as the third argument to can.view in an object where the key is the name of the helper and the value is the helper function:
*/

/*
Global helpers

You can register global helpers using can.mustache.registerHelper:

*/
can.Mustache.registerHelper('i10n', function(str, options) {
  return (window.Globalize != undefined ? Globalize.localize(str()) : str());
});

can.Mustache.registerHelper('uppercase', function(val, options) {
  if (typeof val === 'function') {
    return val().toUpperCase();
  } else {
    return val.toUpperCase();
  }
});

/*
Partials
You can nest templates in other templates by using partials. Partials inherit the context from which they are called. They are evaluated at render time, so you should be careful to avoid infinite loops. To include a partial, put its URL or ID inside {{> }}.

With these templates:

<script type="text/mustache" id="names">
<ul>
{{#names}}
    {{>user}}
{{/names}}
</ul>
</script>
<script type="text/mustache" id="user">
<li>{{firstName}} {{lastName}}</li>
</script>
the expanded template at render time would look similar to:

<ul>
{{#names}}
    <li>{{firstName}} {{lastName}}</li>
{{/names}}
</ul>
*/