**Primitive and reference types**
I´m going to suppose that you are familiar with the concept of "Data Types" (string, number, boolean, null... object)
Our "data" can be classified as Primitive or Reference in relation to _where_ and _how_ it´s stored in memory.

* Variables that hold "just one value" are stored in the "stack" (memory, faster but less storage) and every time we pass them to, for example a function, we pass the value.
* Variables that hold "multiple values" (like objects) are stored in the "heap" (memory, slower but more storage) and are passed as reference: we don´t pass the value, if not, a pointer that is going to reference to that value.

Primitive Types are copied by value (and they are immutable)

Primitive Type: string
We declare a variable and initialize it with the value of "Peter".
Then, we declare an initialize a new variable with the VALUE of the previous one, name.
If we decide to change the value of name, name will hold the new data but name1 will keep the value that we passed: "Peter".

```
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

Now, let´s try to do something similar with a Reference Type.

```
let person = { name: "Peter"};

let name = person.name;
let name1 = name;

person.name = "Pan";


console.log(person);
console.log('name ' + name);
console.log('name1 ' + name1);
```

Result:

```
Object { name: "Pan" }
name Peter debugger eval code:10:1
name1 Peter
```

Primitives are compared by value.

```
var a = 1;
var b = 1;
a === b;
```

This returns 'true'.

However, this is false for Reference (where the comparison is between the spaces in the heap that each one is occupying)

```
var a = { a: 1};
var b = { a: 1};
a === b;
```

This returns 'false'
