## Components or screens

<!-- TODO: What are Components

Plus...
They only required render() methods
Through components we create React Elements
Data flows down... For parent to child.
-->

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

### Functional or stateless Component

They are regular ES6 functions with implicit return.

```javascript
import React from 'react';

const App = () => (
  <div className="App">
    <h1>Hello World!</h1>
  </div>
);

export default App;
```

When to use functional components...? When our component only cares about rendering some "JSX".

<!--
TODO: How to pass data or props...
-->

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

<!-- TODO: standardized pass-down properties -->

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
