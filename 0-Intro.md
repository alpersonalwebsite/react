# React

A JavaScript library for building user interfaces.

More than 5 years have passed since the official React´s release (Facebook - March 2013) nevertheless the community interest and adoption are –still- in constant growth.
Everytime I talked with young DEVs, the React´s stamp widely extends its real existence… For the new rows of builders, handling UIs without a solid framework (we can also modestly include Angular, Vue.js…) is something unthinkable and, perhaps, fumes of an old-past ready to be forgotten.
No matter the tool that you pick to support your work (here´s an elder Angular´s patron) we all want the same:

* Simplicity
* Scalability
* Security

## Why React...?

* Composition: small integrated pieces of code (components) that allow us to build complex UI.
* Use of objects to build the UI.
* Declarative approach
* Unidirectional data flow (from parent to child component)
* JavaScript logic: we use just JS (not a particular templating library)
* Server Side Integration (SSR as first render)
* Mobile Apps Development with React Native

**HOF: Higher Order Function**
Is a function that takes a function as an argument or returns a function.

Basic example: function that returns (or creates) a new function.

```
multiplyNumbers = theFirstNumber => {
 return theSecondNumber => theSecondNumber * theFirstNumber;
}

let multiplyNumbers30 = multiplyNumbers(30);


//console.log(multiplyNumbers30);
console.log(typeof multiplyNumbers30);
// function

console.log(multiplyNumbers30(2));
// 60

console.log(typeof multiplyNumbers30(2));
// number
```

But we also have other examples that are vital part of ES6 and React: `.map(), .reduce() and .filter()`

**.reduce()**

`myArray.reduce(callback[, initialValue])`

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

**.map()**

`const myArrayElements = myArray.map(function callback(currentValue[, index[, array]]) { // element to return }[, thisArg])`

Given an array, it generates a new one (just for clarity allow me to repeat, new array) as the result of executing the callback function on each element of the array.

Example: map an array and retrieve a new array with the results assigned to a variable

```
const friends = [
  { name: 'Peter', age: 30 },
  { name: 'Tinkerbell', age: 100 },
  { name: 'Wendy', age: 31 }
];

const friendsNames = friends.map(eachFriend => eachFriend.name);

console.log(friendsNames);
// Array(3) [ "Peter", "Tinkerbell", "Wendy" ]
```

**.filter()**

`var myArrayElements = myArray.filter(callback(element[, index[, array]])[, thisArg])`

Given an array, it generates a new one with the elements that meet the criteria of the function logic.

Example: filter and retrieve all the elements which property name is NOT Wendy

```
const friends = [
  { name: 'Peter', age: 30 },
  { name: 'Tinkerbell', age: 100 },
  { name: 'Wendy', age: 31 }
];

const friendsFiltered = friends.filter(friend => friend.name != 'Wendy');

console.log(friendsFiltered);
/*
(2) […]
0: Object { name: "Peter", age: 30 }
1: Object { name: "Tinkerbell", age: 100 }
*/
```

### What´s JSX...?

It´s an extension to JS syntax recommended by React to describe how our UI. It´s not mandatory; just a really convenient and standardized way of structure our component´s rendering.

Here´s and example using JSX

```
class SayHi extends React.Component {
  render() {
    return <div>Hi {this.props.name}</div>;
  }
}

ReactDOM.render(
  <SayHi hisName="Peter" />,
  document.getElementById('root')
);
```

And the same example (compiled with Babel) with plain or vanilla JavaScript

```
class SayHi extends React.Component {
  render() {
    return React.createElement(
      "div",
      null,
      "Hi ",
      this.props.name
    );
  }
}

ReactDOM.render(React.createElement(SayHi, { hisName: "Peter" }), document.getElementById('root'));
```

<!-- TODO: What´s JSX... -->

<!--
  TODO: Single Page Apps
  You download everything is needed once. Then, we request data through async JS requests.
-->

### SPA: Single Page Applications

The idea under SPA is having a single HTML document using JS to change what the user sees in the screen.

<!-- TODO: Add somewhere that when we are rendering a list we should add a key with a unique id -->
