## JS beyond JavaScript

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

```console
console.log(this);
```

However, something important to remind is that each time one of our function is invoked, a new context (functional context) is created for that particular function.