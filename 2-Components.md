## Components or screens

<!-- TODO: What are Components

Plus...
They only required render() methods
Through components we create React Elements
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
