// can.Map - Used for Objects.
// can.List - Used for Arrays.
// can.compute - Used for values.

var pagination = new can.Map({page: 1, perPage: 25, count: 1388});
console.log(pagination.attr('perPage')); // 25

var hobbies = new can.List(['programming', 'bball', 'party rocking']);
console.log(hobbies.attr(2)); // 'partying'

// The attr method is used to read and write a property or properties from a Map or List.

pagination.attr('perPage');     // 25
pagination.attr('perPage', 50);
pagination.attr('perPage');     // 50
pagination.attr({page: 10, lastVisited: 1});
console.dir(pagination.attr()); // {page: 10, perPage: 50, count: 1388, lastVisited: 1}

pagination.removeAttr('count');
pagination.attr(); // {page: 10, perPage: 50, lastVisited: 1}

/*
// Listening to events
// When a property on a Map is changed with attr, the Map will emit two events: A change event and an event with the same name as the property that was changed. You can listen for these events by using bind:
*/
pagination.bind('change', function(event, attr, how, newVal, oldVal) {
    attr;   // 'perPage'
    how;    // 'set'
    newVal; // 30
    oldVal; // 50
});
pagination.bind('perPage', function(event, newVal, oldVal) {
    newVal; // 30
    oldVal; // 50
});

// You can similarly stop listening to these events by using unbind:

var timesChanged = 0,
    changeHandler = function() { timesChanged++; },
    obs = new can.Map({value: 10});
obs.bind('change', changeHandler);
obs.attr('value', 20);
timesChanged; // 1
obs.unbind('change', changeHandler);
obs.attr('value', 30);
timesChanged; // 1

/*
Iterating though a Map
If you want to iterate through the properties on a Map, use each:
*/

pagination.each(function(val, key) {
    console.log(key + ': ' + val);
});
// The console shows:
// page: 10
// perPage: 30
// lastVisited: 1

/*
Extending a Map
Extending a can.Map (or can.List) lets you create custom observable types. The following extends can.Map to create a Paginate type that has a .next() method to change its state:
*/

Paginate = can.Map.extend({
  limit: 100,
  offset: 0,
  count: Infinity,
  page: function() {
    return Math.floor(this.attr('offset') / this.attr('limit')) + 1;
  },
  next: function() {
    this.attr('offset', this.attr('offset') + this.attr('limit') );
  }
});
var pageInfo = new Paginate();
pageInfo.attr("offset") //-> 0
pageInfo.next();
pageInfo.attr("offset") //-> 100
pageInfo.page()         //-> 2

/*
Observable Arrays
As mentioned above, CanJS also provides observable arrays with can.List. can.List inherits from can.Map, so a List works much the same way an Map does, with the addition of several methods useful for working with arrays:

- indexOf, which looks for an item in a List.
- pop, which removes the last item from a List.
- push, which adds an item to the end of a List.
- shift, which removes the first item from a List.
- unshift, which adds an item to the front of a List.
- splice, which removes and inserts items anywhere in a List.
*/

/*
Computed values
CanJS also provides a way to make values themselves observable with can.compute. A Compute represents a dynamic value that can be read, set, and listened to just like a Map.

Static Computes

A simple static Compute contains a single value, and is created by calling can.compute(value). This value can be read, set, and listened to:

*/

// create a Compute
var age = can.compute(25),
    previousAge = 0;
// read the Compute's value
age(); // 25
// listen for changes in the Compute's value
age.bind('change', function(ev, newVal, oldVal) {
    previousAge = oldVal;
});
// set the Compute's value
age(26);
console.log('age:', age());       // 26
console.log('prevAge:', previousAge); // 25

/*
Composite Computes

Computes can also be used to generate a unique value based on values derived from other observable properties. This type of compute is created by calling can.compute(getterFunction). When the observable properties that the compute is derived from change, the value of the compute changes:

Since the value of the Compute is cached any time a derived value is changed, reading the value is fast.
*/

var names = new can.Map({
    first: 'Alice',
    last: 'Liddell'
});
var fullName = can.compute(function() {
    // We use attr to read the values
    // so the compute knows what to listen to.
    return names.attr('first') + ' ' + names.attr('last');
});
var previousName = '';
fullName();   // 'Alice Liddell'
fullName.bind('change', function(ev, newVal, oldVal) {
    previousName = oldVal;
});
names.attr({
    first: 'Allison',
    last: 'Wonderland'
});
fullName();   // 'Allison Wonderland'
previousName; // 'Alice Liddell'

/*
Converted Computes

Computes are also useful for creating links to properties within Observes. One of the most frequent examples of this is when converting from one unit to another.
*/

// progress ranges from 0 to 1.
var project = new can.Map({ progress: 0.3 });
var progressPercentage = can.compute(function(newVal) {
    if(newVal !== undefined) {
        // set a value
        project.attr('progress', newVal / 100);
    } else {
        // get the value
        return project.attr('progress') * 100;
    }
});
progressPercentage();     // 30
// Setting percentage...
progressPercentage(75);
// ...updates project.progress!
project.attr('progress'); // .75








