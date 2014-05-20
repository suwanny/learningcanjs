/*
Components 

Tag
Template
Scope
Helpers
Events

Now that you've learned about observables, templates, and controls, it's time to learn about can.Component. can.Component makes it easy to combine the functionality of these features. We'll use it to rewrite the todo example.

Where:

tag - Specifies the HTML element that components are created on.
scope - Describes a can.Map that is added to the scope used to render the component's template.
template - A template who's content gets inserted within the component's element.
helpers - Local mustache helpers available within the component's template.
events - Listen to events like a can.Control.

*/

can.Component.extend({
  tag: "my-element",
  scope: {
    visible: true,
    toggle: function() {
      this.attr("visible", !this.attr("visible"))
    }
  },
  template: "<div can-click='toggle'>" +
    "{{#isVisible}}" +
    "<content/>" +
    "{{else}}" +
    "I am hidden" +
    "{{/isVisible}}" +
    "</div>",
  helpers: {
    isVisible: function(options) {
      return this.attr("visible") ?
        options.fn() : options.inverse();
    }
  },
  events: {
    "inserted": function() {
      console.log("you add a my-element to the page")
    }
  }
});


/*

Tag
A component represents a custom html element whose nodeName is specified by the component's tag attribute. To create a can.Component constructor function that manages functionality on a <todos-editor> elements, extend can.Component like:

*/

can.Component.extend({
  tag: "todos-editor"
})