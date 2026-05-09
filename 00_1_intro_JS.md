## JS beyond JavaScript

**JS CallStack**
High level intro: Remember, first, that JS is a single-threaded language (this basically means that it can only handle one task at a time).
The JS engine (example: Google V8 or SpiderMonkey) defines the Global Execution Context (GEC) like "the browser or Node" (in relation to where the code is executed), sets the Global Memory or Scope, and creates the Call Stack, which allows the interpreter to keep track of what happened, what is happening and what is going to happen. For more information about this abstract data type: [Stack](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>)

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
     As soon as message() resolves or finishes its execution, it's removed from the stack (there's no need to call what was executed) being salutation() the next function to be called, resolved and then, removed from the stack which will result in an empty Stack.

One quick note about scope:
Both, the functions and the variables of our example are part of the Window (global) context.
You can check the Window's context executing:

```console
console.log(this);
```

However, something important to remember is that each time one of our functions is invoked, a new context (functional context) is created for that particular function.

---

### Primitive and reference types

I'm going to suppose that you are familiar with the concept of "Data Types" (string, number, array, boolean, null, undefined, symbol, object).
Our "data" can be classified as Primitive or Reference in relation to _where_ and _how_ it's stored in memory.

* Variables that hold "just one value" are stored in the "stack" (memory, faster but less storage) and every time we pass them to, for example a function, we pass the value.
* Variables that hold "multiple values" (like objects and arrays) are stored in the "heap" (memory, slower but more storage) and are passed as reference: we don't pass the value, but rather, a pointer that is going to reference that value.

**Primitive Types are copied by value**

Primitive Type: string example.
We declare a variable and initialize it with the value of "Peter".
Then, we declare and initialize a new variable with the VALUE of the previous one, name.
If we decide to change the value of name, name will hold the new data but name1 will keep the value that we passed: "Peter".

```javascript
let name = "Peter";
let name1 = name;
name = "Pan";

console.log('name ' + name);
console.log('name1 ' + name1);
```

Result:

```
name Pan
name1 Peter
```

Remember: we are copying the value that we stored in `name` and set it as the value of `name1`. Two different variables holding two different values.

Now, let's try to do something similar with a Reference Type.

```javascript
let person = { name: "Peter" };

let name = person.name;

person.name = "Pan";

let name1 = name;

let name2 = person;

console.log(person);

console.log('name ' + name);
console.log('name1 ' + name1);

console.log('name2 ' + JSON.stringify(person));
```

Result:

```
{ name: 'Pan' }
name Peter
name1 Peter
name2 {"name":"Pan"}
```

Short explanation:

1. We declare and initialize the variable person with an object.
2. `Variable name` is initialized with the value of the property name of the object person. This value is a string, so it will be passed by value.
3. We change the value of the `property name` of the object person to `string "Pan"`.
4. We declare and initialize the `variable name1` with the value of the variable name (by value).
5. We declare and initialize the `variable name2` with person (by reference).

**Primitives are compared by value**

```javascript
var a = 1;
var b = 1;
a === b;
```

This returns `true`.

However, this is `false` for Reference types (where the comparison is between the spaces in the heap that each one is occupying):

```javascript
var a = { a: 1 };
var b = { a: 1 };
a === b;
```

This returns `false`.

---

### Coercion

Coercion is when we force one data type into another. This happens because JS is pretty flexible handling data types.

Example:

```javascript
console.log(1 + true);
console.log('1' + 1);
```

We force or coerce `true` into `1` and the number `1` into the string `"1"`.

The following operators convert data type values into `numbers`: `- * / %`. However, `+`, as we saw, converts by default into a `string` if either operand is a string.

```javascript
console.log('1' + 1);
console.log('1' - 1);
```

Result:

```
11
0
```