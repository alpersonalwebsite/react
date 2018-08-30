# React

A JavaScript library for building user interfaces

## Why React...?

* Composition: small integrated pieces of code (components) that allow us to build complex UI.
* Use of objects to build the UI.
* Declarative approach
* Unidirectional data flow (from parent to child component)
* JavaScript logic: we use just JS (not a particular templating library)
* Server Side Integration (SSR as first render)
* Mobile Apps Development with React Native

.map(), .reduce() and .filter() examples

**.reduce()**

`.reduce(<callback-function>, <starting-value>)`

It takes a collection of data and reduce it to a single value.
It´s the base of one of the vital parts of Redux´s flow: reducers.

Example: reduce years collection into TOTAL years

```
const friends = [
	{ name: 'Peter', age: 30 },
  { name: 'Tinkerbell', age: 100 },
  { name: 'Wendy', age: 31 }
];

friends.reduce((totalYear, eachAge) => {
	return addFriendsAge = totalYear + eachAge.age;
}, 0);

console.log(addFriendsAge);
// 161
```

Short explanation...
When we call reduce() we start from 0 (try changing 0 to 100).
The first time our function is called, totalYear (or accumulator) will have the value of 0 and eachAge 30.
The return of our function is a new variable (addFriendsAge) with the sum of all ages.

One comment about `return`.
If we are returning in one line we can do...

`renderMessage = message => message;`

```
renderMessage = message => message;

...

render() {
	return (
		<div>{this.renderMessage('Hi')}</div>
	);
}
```

... or ... `renderMessage = message => { return message; };` or the same, `renderMessage = message => { return <div>{message}</div>; };`

For multilines use `()`

```
renderMessage = message => {
	return (
		<div>
			My message: <div>{message}</div>
		</div>
	);
};
```

HOF: Higher Order Function
Example: reduce()

<!-- TODO: What´s is a HOF -->

### What´s JSX...?

<!-- TODO: What´s JSX... -->

<!--
  TODO: Single Page Apps
  You download everything is needed once. Then, we request data through async JS requests.
-->

### SPA: Single Page Applications

The idea under SPA is having a single HTML document using JS to change what the user sees in the screen.

<!-- TODO: Add somewhere that when we are rendering a list we should add a key with a unique id -->
