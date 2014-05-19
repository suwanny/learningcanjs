/*
Routing

Listening to events
Making URLs and links

can.route is the core of CanJS's routing functionality. It is a special Observe that updates window.location.hash when its properties change and updates its properties when window.location.hash changes. You can give can.route a template to translate URLs into property values, but if no route is provided, it just serializes the route into standard URL-encoded notation.

Here is how you might use can.route without a template:


*/