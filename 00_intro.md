# React

A JavaScript library for building user interfaces.

More than 5 years have passed since the official React´s release (*Facebook - March 2013*); nevertheless, the community interest and adoption are in constant growth.

---

*Metric 1:* `github` stars - 06/02/2019

* **[140_271]** [vuejs/vue](https://github.com/vuejs/vue)
* **[130_395]** [facebook/react](https://github.com/facebook/react)
* **[59_562]**[angular/angular.js](https://github.com/angular/angular.js)
* **[51_687]** [jquery/jquery](https://github.com/jquery/jquery)
* **[48767]** [angular/angular](https://github.com/angular/angular)

*Metric 2:* `dependent repositories`
* **[2_037_095]** [facebook/react](https://github.com/facebook/react)
* **[862_083]** [vuejs/vue](https://github.com/vuejs/vue)
* **[330_978]** [jquery/jquery](https://github.com/jquery/jquery)

---

Every time I talked with young DEVs, the React´s stamp widely extends its real existence… For the new rows of builders, handling UIs without a solid framework (we can also modestly include Angular, Vue.js…) is something unthinkable and, perhaps, fumes of an old-past ready to be forgotten.
No matter the tool that you pick to support your work (here´s an elder Angular´s patron) we all want the same:

* Simplicity
* Scalability
* Security (everything is converted into a string before render). This prevents XSS.

## Why React...?

* Composition: small integrated pieces of code (components) that allow us to build complex UI.
* Use of objects to build the UI.
* Declarative approach: we "tell" what we want not "how/steps to" obtain what we want (imperative)
* Unidirectional data flow (from parent to child component) or "one way binding"
* JavaScript logic: we use just JS (not a particular templating library)
* Server Side Integration (SSR as first render)
* Mobile Apps Development with React Native

We are going to follow [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)

**HOF: Higher Order Function**
Is a function that takes a function as an argument or returns a function.

Basic example: function that returns (or creates) a new function.

```javascript
multiplyNumbers = theFirstNumber => {
  return theSecondNumber => theSecondNumber * theFirstNumber;
};

let multiplyNumbers30 = multiplyNumbers(30);

// console.log(multiplyNumbers30);
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

```javascript
const friends = [
  { name: 'Peter', age: 30 },
  { name: 'Tinkerbell', age: 100 },
  { name: 'Wendy', age: 31 }
];

friends.reduce((totalYear, eachAge) => {
  return (addFriendsAge = totalYear + eachAge.age);
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

**JS CallStack**
High level intro: Remember, first, that JS is a single-threaded language (this basically means that it can only handle one task at the time).
The JS engine (example: Google V8 or SpiderMonkey) defines the Global Execution Context (GEC) like "the browser or Node" (in relation to where the code is executed), sets the Global Memory or Scope) and creates the Call Stack, which allows the interpreter to keep track of what happened, what is happening and what is going to happen. For more information about this abstract Data Type: [Stack](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>)

An easy example to illustrate:

```javascript
const name = 'Peter Pan';

function salutation() {
  alert(message());
}

function message() {
  return 'Hello... ' + name;
}

salutation();
```

* _Context_: browser (Firefox)
* _Scope_: name, salutation() and message() are globally accessible
* _CallStack_
  1. salutation()
  2. message()
     As soon as message() resolves or finishes its execution, it´s removed from the stack (there´s no need to call what was executed) being salutation() the next function to be called, resolved and then, removed from the stack which will result in an empty Stack.

One quick note about scope:
Both, the functions and the variable of our example are part of the Window (global) context.
You can check the Window´s context executing:

```
console.log(this);
```

However, something important to remind is that each time one of our function is invoked, a new context (functional context) is created for that particular function.

---

### What´s JSX...?

It´s an extension to JS syntax recommended by React to describe how our UI. It´s not mandatory; just a really convenient and standardized way of structure our component´s rendering.

Note: It´s important to remember React´s motto: `A JavaScript library for building user interfaces.` Following this notion, you will find coherent to have a strict relation between `logic` and `markup` in the same small unit or component.

Here´s and example using JSX

```javascript
class SayHi extends React.Component {
  render() {
    return <div>Hi {this.props.name}</div>;
  }
}

ReactDOM.render(<SayHi hisName="Peter" />, document.getElementById('root'));
```

And the same example (compiled with Babel) with plain or vanilla JavaScript

```javascript
class SayHi extends React.Component {
  render() {
    return React.createElement('div', null, 'Hi ', this.props.name);
  }
}

ReactDOM.render(
  React.createElement(SayHi, { hisName: 'Peter' }),
  document.getElementById('root')
);
```

Note: Babel is used to compile or transpile ES6 code into syntax that old browsers can interpret.

### SPA: Single Page Applications

The idea under SPA is having a single HTML document using JS to change what the user sees on the screen, avoiding, in consequence, having to refresh the page.
So, if the user clicks on x-link, x-data (remember that we have everything downloaded on the "first load": HTML/CSS/JS) is going to be requested asynchronously showing the proper view for that particular set of data.

React does not require a SPA implementation or approach. You can mix React with other JS libraries, use it partially (for certain features) and combine it with `Server Side Logic`.

At future we are going to see...

1. Routing
2. Keep UI and URL in sync: particular content for each route (allowing you to copy and paste a URL on the browser´s address bar, or, interact with other of its control elements like the "Go back" arrow).

For this, we are going to use `react-router-dom` package. I strongly encourage you to read **React Router** [documentation](https://github.com/ReactTraining/react-router).
