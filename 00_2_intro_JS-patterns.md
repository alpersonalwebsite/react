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