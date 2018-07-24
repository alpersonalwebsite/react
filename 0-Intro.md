# React

## Why React...?

* Composition
* Use of objects to build the UI.
* Declarative
* Unidirectional data flow
* JavaScript: we use just JS (not a particular templating library)

.map(), .reduce() and .filter() examples

.reduce(<callback-function>, <starting-value>)
It takes a collection of data and reduce it to a single value.

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

HOF: Higher Order Function
Example: reduce()

<!-- TODO: What´s is a HOF -->

### What´s JSX...?

<!-- TODO: What´s JSX... -->

<!--
  TODO: Single Page Apps
  You download everything is needed once. Then, we request data through async JS requests.
-->
