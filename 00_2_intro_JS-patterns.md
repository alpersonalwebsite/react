## Functional Programming

### HOF: Higher Order Function
Is a `function` that takes a function as an argument AND/OR returns a function.

*Basic example:* function that returns (or creates) a new function.

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

---

### Immutability
* Mutable data that CAN be modified after creation
* Immutable can NOT be modified

*Mutable example*: as you can see, when we `push()` we are modifying the original source, `arr1`
```javascript
const arr1 = [1,2,3]

const arr2 = arr1

arr2.push(4)

console.log(arr1, arr2)
console.log(arr1 == arr2, arr1 === arr2)
```

Result:
```javascript
[1, 2, 3, 4]
[1, 2, 3, 4]
true
true
```

*Immutable example*: with the spread operator we are spreading all the values of `arr1` in a new array
```javascript
const arr1 = [1,2,3]

const arr2 = [...arr1]

arr2.push(4)

console.log(arr1, arr2)
console.log(arr1 == arr2, arr1 === arr2)
```

Result:
```javascript
[1, 2, 3]
[1, 2, 3, 4]
false
false
```

*Important note*: You will find several tutorials (and libraries) offering methods to avoid mutating data. Some of them, using the same naming (`push`) which can be confusing, especially at the beginning. Let's see this case to dispel any possible doubt during your research.

```javascript
/* If your prefer fat arrow fn
const push = element => arr => {
  let tempArr = [...arr]
  tempArr.push(element)
  return tempArr
}
*/

function push(element) {
  return function (arr) {
    let tempArr = [...arr]
    tempArr.push(element)
    return tempArr
  }
}

const arr1 = [1,2,3]
const arr2 = arr1
const arr3 = push(5)(arr1)

console.log(arr1, arr2, arr3)
```

Result:
```javascript
[1, 2, 3]
[1, 2, 3]
[1, 2, 3, 5]
```

The method `push()()` is a `curried function` (*a function that takes multiple arguments one at the time: btw, we will see this topic in depth*). First, we are passing the element that we want to append in our new array; second, the original array.

Here's the important part. In our example, `push()` is a function defined in the `global scope` while `[].push` a method of the Array data type.

Try...
```javascript
console.log(push())
console.log([].push)
```

Result:
```javascript
function (arr) {
  let tempArr = [...arr]
  tempArr.push(element)
  return tempArr
}
function push() { [native code] }
```



In most of the cases, using the `spread operator (...)` will be enough (even for nested arrays).

```javascript
const arr1 = [1, [2,3, [4]], 5, [6, [7]]]
const arr2 = [...arr1]

console.log(arr1, arr2)
```

```javascript
[1, [2, 3, [4]], 5, [6, [7]]]
[1, [2, 3, [4]], 5, [6, [7]]]
```