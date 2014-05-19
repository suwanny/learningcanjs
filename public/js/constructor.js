/* global can */
var Todo = can.Construct.extend({}, {
  init: function(owner) {
    this.owner = owner;
  },
  isSecret: function (){
    return false;
  },
  allowedToEdit: function () {
    return ! this.isSecret();
  }
});

// If only one argument is passed, they are considered prototype properties.
var PrivateTodo = Todo.extend({},{
  init: function(owner, isShared) {
    can.Construct.prototype.init.apply(this, arguments);
    this.isShared = isShared;
  },
  isSecret: function() {
    return true;
  }
});

var t = new Todo('me');
console.log('allowedToEdit:', t.allowedToEdit()); // true
console.log('owner:', t.owner); // true

var p = new PrivateTodo();
console.log('allowedToEdit:', p.allowedToEdit()); // false

