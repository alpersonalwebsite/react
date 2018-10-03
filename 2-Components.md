## Components or screens

We use components to split our UI into reusable "blocks" that receive `props` (aka, data) and return, as we saw earlier, React elements.

You should name your component following the CamelCase (also called UpperCamelCase) convention. Example: `<ListOfRecords />`; use Lower Camel Case for DOM tags and HOC.

In react there´re 2 types of Components:

1. Class components
2. Functional or Stateless components

If it´s possible (aka, no local state, no custom or life-cycle methods), use `functional components`

Note: Remember that `props` are inputs to the Components. We pass this data from parent to child.

### Class Component

```javascript
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello World!</h1>
      </div>
    );
  }
}

export default App;
```

Note: Class components require `render()` method.

### Functional or stateless Component

They are regular JS functions that returns a React element.

Example: pre ES6

```javascript
function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}
```

Example: ES6
(...with implicit return)

```javascript
import React from 'react';

const App = () => (
  <div className="App">
    <h1>Hello World!</h1>
  </div>
);

export default App;
```

We use functional components when we just care about `rendering JSX`. If we want to handle `local state` or work with custom methods we should opt for `Class Components`.

---

### Composition

One of the key aspects of React is `Composition`. Following this logic, we can have -multiple- **small components** as part of the `JSX` (or output).

Example:

```javascript
const App = () => (
  <div className="App">
    <h1>Hello World!</h1>
    <IntroComponent />
    <LanguageComponent default="en">
    <ContactComponent>
  </div>
);
```

Remember that **small components** contribute to the re-usable nature of React and its compositional view. However, try to avoid being extremely granular and always preserve the logic´s context and usage.
Example:

* A Car could be the main (or App) component
* Door could be a reusable component. We can call it as many times as doors our main component has.
* The Door component contains children, like handle (which include door-lock as prop)

Nevertheless, we are not going to dissect the door-lock until we have screws, metal, plastic and paint... Even when (for example) screws are going to be used in several elements.

Think in elements as words and components as phrases.

#### Passing props

**src/App.js** - Class Component

```javascript
import React, { Component } from 'react';
import Child from './Child';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Child onShowingHello="Hello" />
      </div>
    );
  }
}

export default App;
```

**src/Child.js** - Functional Component

```javascript
import React from 'react';

const Child = props => (
  <div>
    <div>I´m receiving... {props.onShowingHello}</div>
  </div>
);

export default Child;
```

If you go to http://localhost:3000/ you will see: `I´m receiving... Hello`

Passing an array and `Each child in an array or iterator should have a unique "key" prop.` warning.
Imagine that rather than passing a `string` we pass an `array` and we loop it with `.map()` on our `child component`
Probably, you would do something like...
**src/App.js**

```javascript
import React, { Component } from 'react';

const Child = props => (
  <div>
    <div>
      I´m receiving...{' '}
      {props.onShowingHello.map(eachGreeting => <li>{eachGreeting}</li>)}
    </div>
  </div>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Child onShowingHello={['Hi', 'Hello', 'Hola', 'Hi']} />
      </div>
    );
  }
}

export default App;
```

... and it works, however, if you check your `dev console` you will see the following warning...

![React DevTools: Checking props](/images/map-array-warning.png)

What´s going on...?
When we are looping an array, each child (no matter the element) must have a **UNIQUE key** property which will allow React to preserve the Component>DOM relation used in the reconciliation process, letting React know which element changed.

**We can "fix" this adding a key to the element**. For our example, we are going to use the `item index` since we don´t have other "stable value" (I don´t recommend using it in a real project. Check below.)

If we try to use the own element/item, like "Hi", and, if our array has the element twice: `['Hi', 'Hello', 'Hola', 'Hi']` we will end with a similar warning but now referring to "key duplication".

![React DevTools: Checking props](/images/map-array-duplicated-key.png)

However, you should remember that index is -still- potentially dangerous and it can produce "unexpected side effects".

Note: We use `htmlFor` instead of `for`.

<!-- TODO: Extend this... -->

```javascript
import React, { Component } from 'react';

const Child = props => (
  <div>
    <div>
      I´m receiving...{' '}
      {props.onShowingHello.map((eachGreeting, index) => (
        <li key={index}>
          <input
            type="checkbox"
            id={eachGreeting}
            name={eachGreeting}
            value={eachGreeting}
          />
          <label htmlFor={eachGreeting}>{eachGreeting}</label>
        </li>
      ))}
    </div>
  </div>
);

class App extends Component {
  state = {
    ourSalutation: ['Hi', 'Hello', 'Hola']
  };
  render() {
    return (
      <div className="App">
        <Child onShowingHello={this.state.ourSalutation} />
        <button
          onClick={() =>
            this.setState({
              ourSalutation: ['be', ...this.state.ourSalutation]
            })
          }>
          Add
        </button>
      </div>
    );
  }
}

export default App;
```

If we run our App we will see a plain (extremely flat) list of checkboxes with no errors or warnings in our `dev console`. Next to each checkbox, the proper element with its index.

Do the following...

1. Check "Hola" (the last element) **which has index 2**
2. Click on Add
3. Revise the list
   Yes... Now "Hello" is checked. It changed its index from 1 to 2 and "Hola" is on index 3.

Does it make sense now...?
React still thinks that the key attribute with value 2 is "tied" to "Hola".

How should we fix the issue in a PROD env...?

First, in our case, change the hard-coded value of the local state property `ourSalutation`

Before:

```javascript
state = {
  ourSalutation: ['Hi', 'Hello', 'Hola']
};
```

After:

```javascript
state = {
  ourSalutation: [
    { salutation: 'Hi', timestamp: '29519bf2-c68e-11e8-8f1c-f3e5f253a17f' },
    {
      salutation: 'Hello',
      timestamp: '3c72eae1-c68e-11e8-a508-89da3bf216bc'
    },
    { salutation: 'Hola', timestamp: '46af7641-c68e-11e8-9146-8343393a23eb' }
  ]
};
```

Second, install the package `uuid` and use the `version 1` (aka, timestamp). Then, change you `onClick handler`

Before:

```javascript
<button
onClick={() =>
  this.setState({
    ourSalutation: ['be', ...this.state.ourSalutation]
  })
}>
```

After:

```javascript
<button
  onClick={() =>
    this.setState({
      ourSalutation: [
        { salutation: 'be', timestamp: uuid.v1() },
        ...this.state.ourSalutation
      ]
    })
  }
>
```

Third, in your `Child component` destructure the object and use `timestamp` as value for the `key`.
Now, try again checking x-checkbox and clicking on Add.

I´m attaching the entire example with all the needed code in the folder: `/basic-react-example[map-with-key]`

_Remember_: each key should be `unique` and `static`.

Let´s say that we want to pass down a state property of App.js to Child.js as props.

**src/App.js**

```javascript
import React, { Component } from 'react';
import Child from './Child';

class App extends Component {
  state = {
    message: 'Hello'
  };
  render() {
    return (
      <div className="App">
        <Child onShowingHello={this.state.message} />
      </div>
    );
  }
}

export default App;
```

**src/Child.js**
If we are using a Functional Component we will access to props through `props`, for example, `props.onPassingMessage`

If we are using a Class Component, thorugh `this.props.onPassingMessage`

##### Dynamic values passed as props and rendering

In the previous examples we were hard-coding the value of message...

```javascript
state = {
  message: 'Hello'
};
```

However, in practice, usually our data is going to be dynamic. Think in an input where the user introduce some value (for example message) which is going to be passed down as prop. We would start with an empty string (`message: ''`), then a Controlled Form would update the value of the state property (`message: 'Hola'`) what would result in... `I´m receiving... Hola`
But, until your parent Component pass "something" down, different than the default empty string, the Child one will render: `I´m receiving...`
Not a great user experience... I´m rendering... Nothing...?

We can fix this replacing...

```html
...
<div>I´m receiving... {props.onShowingHello}</div>
...
```

With this...

```javascript
...
{onShowingHello !== '' ? `I´m receiving... ${onShowingHello}` : null}
...
```

Now, we are only going to display our message if it´s different than the default one (empty string).
