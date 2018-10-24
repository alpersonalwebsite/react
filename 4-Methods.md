## Methods

Let´s grab the previous example and use a `Global Event Handler` (for this case, onClick) with setState() and a custom method.

Note: In React events (like onClick), methods and component´s attributes (aka, props) are named using `lower camelCase`.

### Setting state with onClick

```javascript
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
}
```

### Setting state with custom method

```javascript
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

```javascript
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

```javascript
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

Notes:
In `App.js` we pass a reference to the function updateStateProperty `onUpdateStateProperty={this.updateStateProperty}` as props to `Child.js` where we are going to execute the function with the proper arguments `onClick={() => props.onUpdateStateProperty('yourName', 'Wendy')}`
