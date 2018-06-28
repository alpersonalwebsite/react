## Methods

Let´s grab the previous example and use a Global Event Handler (for this case, onClick) and a custom method.

### Setting state with onClick

```
class App extends Component {
  state = {
    yourName: 'Peter Pan'
  };

  render() {
    return (
      <div className="App">
        <h1>{`Hello ${this.state.yourName}`}</h1>
        <div onClick={() => this.setState({ yourName: 'Wendy' })}>
          Change name to Wendy on clicking...
        </div>
      </div>
    );
  }
```

### Setting state with custom method

```
class App extends Component {
  state = {
    yourName: 'Peter Pan'
  };

  updateStateProperty = (stateProperty, statePropertyValue) => {
    this.setState({ [stateProperty]: statePropertyValue });
  };

  render() {
    return (
      <div className="App">
        <h1>{`Hello ${this.state.yourName}`}</h1>
        <div onClick={() => this.updateStateProperty('yourName', 'Wendy')}>
          Change state...
        </div>
      </div>
    );
  }
}
```

### Setting state with custom method passing it down

App.js

```
import React, { Component } from 'react';
import Child from './Child';

class App extends Component {
  state = {
    yourName: 'Peter Pan'
  };

  updateStateProperty = (stateProperty, statePropertyValue) => {
    this.setState({ [stateProperty]: statePropertyValue });
  };

  render() {
    return (
      <div className="App">
        <h1>{`Hello ${this.state.yourName}`}</h1>
        <Child onUpdateStateProperty={this.updateStateProperty}>
          Change state...
        </Child>
      </div>
    );
  }
}

export default App;
```

Child.js

```
import React from 'react';

const Child = props => (
  <div className="App">
    <div onClick={() => props.onUpdateStateProperty('yourName', 'Wendy')}>
      Change state...
    </div>
  </div>
);

export default Child;
```
