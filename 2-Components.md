## Components or screens

<!-- TODO: What are Components

Plus...
They only required render() methods
Through components we create React Elements
Data flows down... For parent to child.
-->

### Class Component

```
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

```
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

```
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

```
import React from 'react';

const Child = props => (
  <div>
    <div>I´m receiving... {props.onShowingHello}</div>
  </div>
);

export default Child;
```

If you go to http://localhost:3000/ you will see: `I´m receiving... Hello`

<!-- TODO: Is there a proper way to pass down. I like to use on... Check -->

Let´s say that we want to pass down a state property of App.js to Child.js as props.

**src/App.js**

```
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
