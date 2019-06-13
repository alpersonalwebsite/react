## Local State

Previously, we saw `props` as read-only or immutable data (passed from a parent to a child component). Now, we are going to see data that can "mutate" inside the component: `state`.
Let´s imagine for a moment a TODO list.
We have several items and boxes to check as "done".
The original state of each item would be `false` and, when the user or "some logic" clicks (aka, checks) on a particular "check-box" the property state associated to it would change its value to `true` (the process could be reversed un-checking the box what would set the state to its original value: `false`).

Remember: our `state` defines the UI of our App. Any "change" on the update will impact the UI. Also, that `state` is something related to the component which has and sets it, that´s why we talk about `local state`.

### Set state

We set the state through the state class property and access to it via: this.state.theSelectedProperty.

We **NEVER** modify the state directly, if not, with `setState()`

**REALLY Wrong:** 

```javascript
this.state.name = 'Peter';
```

Right:

```javascript
this.setState({ name: 'Peter' });
```

If you modify the property of the state directly (as in the wrong example), React will not be aware of the change and it **will NOT re render your component**.

```javascript
class App extends Component {
  state = {
    yourName: 'Peter Pan'
  };
  render() {
    return (
      <div className="App">
        <h1>{`Hello ${this.state.yourName}`}</h1>
      </div>
    );
  }
```

**What are Template literals...?**
(Also called Template Strings)

Example: `` `Hello ${this.state.yourName}` ``
Basically, the "ES6 way" to concatenate "strings" and embedded expressions, improving readability and "code formatting".
We enclose the entire content between back-ticks (\`\`).
Expressions are defined with ${yourExpression}.
They can be single or multi-line. Spaces, tabs and break-lines are preserved.

*Pre-ES6:* string and variable concatenation

```javascript
var name = 'Peter';

// Here we have to use double quotes ("") or escape single quotes ('')
console.log('His name is "', name, '"');
console.log("His name is '" + name + "'");
```

ES6: string and variable concatenation

```javascript
const name = 'Peter';

// Here we don´t care about single or double quotes
console.log(`His 'name' is "${name}"`);
```

Example:

```javascript
console.log(`
Hello
  My
    name is   Peter
`);
```

**Every time the state changes the component will re-render**.

We should avoid initializing the state with props.
For example:

```javascript
state = {
  yourName: this.props.userName
};
```

Why...?

1. If the props change (aka, are updated) the state will not reflect them.
2. To avoid data duplication.

We can freely pass down `state` as `props`.

### How to "update" or set new state Value

If we *don´t care* about the previous state, we can do the following...

```javascript
componentDidMount() {
  this.setState({
    yourName: 'Wendy'
  })
}
```

Note: `setState()` will merge the object that we pass in into the current state.
BTW, I´m using the lifecycle `componentDidMount()` to force a change in the state without any user interaction and just for demo purposes. In a *tiny app* where a call to an API is done in this "stage", a method or a callback to that API call could set the new data for the state properties through `this.setState()`.


If the "new state" depends in the "previous one" (like `booleans` or `adding/subtracting`)

```javascript
this.setState(prevState => {
  return {
  ...prevState,
  initial: prevState.initial + 1
}
})

```

With `react@16.8.0` (or higher) we **CAN** use `state` in `functional components` through `hooks`.

Our previous example, utilizing the `useState()` hook would look like...

```javascript
import React, { useState } from 'react';

const App = () => {
  const [yourNameState, setYourNameState] = useState('Peter Pan');
  return (
    <div>
      <h1>{`Hello ${yourNameState}`}</h1>
    </div>
  )
}

export default App;
```
<!-- TODO: Explain useState -->


#### Basic difference between props and state

* props: read-only data
* state: mutable data

Remember: *in both cases, either when a Component receives props or the state is "updated", it will re-render*.

Now, an example with several of the topics we covered.
We have a local (or component) state property: `friends`
Also, a method to delete a particular friend which is taken as argument. What we pass to this function is going to be "filtered out", setting the new state without the given friend.
In our JSX we map our friends array.
When you click in the button, we call the function `deleteFriend()` (in its proper context) passing a hard-coded value (`Wendy`) which is the one that we are going to pull out.

```javascript
import React, { Component } from 'react';

class App extends Component {
  state = {
    friends: [
      { id: 0, name: 'Wendy' },
      { id: 1, name: 'Tinkerbell' },
      { id: 2, name: 'Cap. Hook' }
    ]
  };

  deleteFriend = friend => {
    this.setState(state => ({
      friends: state.friends.filter(eachFriend => eachFriend.name !== friend)
    }));
  };

  render() {
    return (
      <div>
        <div>
          {`Friends in local state: ${this.state.friends.map(
            eachFriend => eachFriend.name
          )}`}
        </div>
        <button onClick={() => this.deleteFriend('Wendy')}>
          Delete friend!
        </button>
      </div>
    );
  }
}

export default App;
```

Maybe you are thinking... Why do we use `() => this.deleteFriend('Wendy')`...? Simple answer: Just to avoid context issues. We want to be sure that we are referring to the Component´s context. For this, we have 2 options...

1. Wrap our event handler inside a fat arrow function (previous example)
2. Binding the context of `deleteFriend()` at the time we reference it.

Example \#2 with `bind()`

Change...

```javascript
<button onClick={() => this.deleteFriend('Wendy')}>Delete friend!</button>
```

With...

```javascript
<button onClick={this.deleteFriend.bind(null, 'Wendy')}>Delete friend!</button>
```

In this example, the `new function` that `.bind()` returns will have access to the `global context` (since we are using `null`) and will receive `'Wendy'` as parameter or argument.

... there´re others but these two are the most used ones.

---

You can see that we are **NOT initializing our state in the constructor** (as you will notice in several React tutorials).

Example: *state*
```javascript
import React, { Component } from 'react';

class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    name: 'Peter'
  };
}

...
}
```

First... Some contextual observations...

* `Constructor` is a method for creating and initializing an object created with a class.
* A constructor can use the super keyword to call the constructor of the `super` class. What we are doing is initializing the `constructor of the parent class` as well.

Look at this code:
```javascript
class Person {
  constructor() {
    this.name = "Default";
  }
}

class Friend extends Person {
  constructor() {
    this.name = "Peter";
  }
}

const newFriend = new Friend();
console.log(newFriend.name);
```

If you try to run it with `ES5` you will receive the following error:
```
ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```

This can be easily fixed adding the `super()` method at the top level of each child (aka `extended class`) constructor.
```javascript
class Friend extends Person {
  constructor() {
    super();
    this.name = "Peter";
  }
}
```

If you are using `Babel+ES6` you can:
1. Remove the `constructor()` method
2. Remove the `super()` method
3. Remove the `this` keyword from the properties

The result would be clearer:
```javascript
class Person {
  name = "Default";
}

class Friend extends Person {
  name = "Peter";
}

const newFriend = new Friend();
console.log(newFriend.name);
```

I you review the `transpiled code` you will notice that `Babel` will set the constructor for us.

For more information about this and other changes to the spec, check: [Class field declarations for JavaScript](https://github.com/tc39/proposal-class-fields)

So, the *state* example would be:

```javascript
import React, { Component } from 'react';

class App extends Component {
  state = {
    name: 'Peter'
  };
...
}
```

... and, since in this tutorial we are using `create-react-app` you don´t have to worry about wiring up Babel. It´s part of the package!!!

### Lifting state

Sometimes, you will have more than one component trying to access to the same "piece of data".
If you know `redux` or `react context API` (among others) forget them for a moment. Think about hard-coded data (as initial properties state) or an user supplying info through a form. Yo don´t need to make a long persistence... Just share that data between components.

If there´s no deeply nested need (ComponentA -> ComponentB -> ComponentC -> CompnentD) a good approach would be "host" that state on the nearest parent.
Example:

```javascript
import React, { Component } from 'react';

const ListOfBook = props => {
  return (
    <div>
      <h2>List of books</h2>
      <div>
        {props &&
          props.books.map(book => {
            return book.title;
          })}
      </div>
    </div>
  );
};

const RandomBook = props => {
  return (
    <div>
      <h2>Random book (strig object)</h2>
      <div>
        {props &&
          JSON.stringify(props.books[Math.floor(Math.random() * 3 + 0)])}
      </div>
    </div>
  );
};

class App extends Component {
  state = {
    books: [
      { title: 'Title_1...', description: 'Description_1', author: 'Author_1' },
      { title: 'Title_2...', description: 'Description_2', author: 'Author_2' },
      { title: 'Title_3...', description: 'Description_3', author: 'Author_3' },
      { title: 'Title_4...', description: 'Description_4', author: 'Author_4' }
    ]
  };
  render() {
    return (
      <div>
        <h1>My App</h1>
        <ListOfBook books={this.state.books} />
        <RandomBook books={this.state.books} />
      </div>
    );
  }
}

export default App;
```
