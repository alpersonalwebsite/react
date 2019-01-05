**Primitive and reference types**
I´m going to suppose that you are familiar with the concept of "Data Types" (string, number, boolean, null... object)
Our "data" can be classified as Primitive or Reference in relation to where and how it´s stored in memory.

Variables that hold "just one value" are stored in the "stack" (memory) and every time we pass them to, for example a function, we pass the value.
Variables that hold "multiple values" (like objects) are stored in the "heap" (memory) and are passed as reference: we don´t pass the value, if not, a pointer that is going to reference to that value.
