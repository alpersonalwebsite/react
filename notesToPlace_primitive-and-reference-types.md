**Primitive and reference types**
I´m going to suppose that you are familiar with the concept of "Data Types" (string, number, array, boolean, null, undefined, symbol, object)
Our "data" can be classified as Primitive or Reference in relation to _where_ and _how_ it´s stored in memory.

* Variables that hold "just one value" are stored in the "stack" (memory, faster but less storage) and every time we pass them to, for example a function, we pass the value.
* Variables that hold "multiple values" (like objects and arrays) are stored in the "heap" (memory, slower but more storage) and are passed as reference: we don´t pass the value, if not, a pointer that is going to reference to that value.

Primitive Types are copied by value

Primitive Type: string example.
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

Remember: we are copying the value that we stored in `name` and set it as the value of `name1`. Two different variables holding two different values.

Now, let´s try to do something similar with a Reference Type.

```
let person = { name: "Peter"};

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

1. We declare an initialize the variable person with an object.
2. `Variable name` is initialized with the value of the property name of the object person. This value is a string, so it will be passed by value.
3. We change the value of the `property name` of the object person to `string "Pan"`
4. We declare and initialize the `variable name1` with the value of the variable name (by value)
5. We declare and initialize the `variable name2` with person (by reference).

Primitives are compared by value.

```
var a = 1;
var b = 1;
a === b;
```

This returns `'true'`

However, this is false for Reference (where the comparison is between the spaces in the heap that each one is occupying)

```
var a = { a: 1};
var b = { a: 1};
a === b;
```

This returns `'false'`
