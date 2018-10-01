## Conditional Rendering

Previously, we saw some "conditional logic" like the "ternary operator". Now, we are going to resume this subject seeing different ways to render content in relation to x-criteria.

#### State and Class

In the first cases, we are going to be using our state property `conditionIs` to show one message or other.

**if/else** - regular if/else inside render() or custom method

```javascript
import React, { Component } from 'react';

class App extends Component {
  state = {
    conditionIs: true
  };

  render() {
    const { conditionIs } = this.state;

    let jSx;
    if (conditionIs) {
      jSx = `I've a cristal clear state... I'm ${conditionIs}`;
    } else {
      jSx = `I'm ${conditionIs}`;
    }

    return <div>{jSx}</div>;
  }
}

export default App;
```

**if/else** - condition ? () : ()

```javascript
render() {
  const { conditionIs } = this.state;

  return (
    <div>
      {conditionIs
        ? `I've a cristal clear state... I'm ${conditionIs}`
        : `I'm ${conditionIs}`}
    </div>
  );
}
}
```

**Ternary operator**

```javascript
render() {
  const { conditionIs } = this.state;

  let jSx = conditionIs
    ? `I've a cristal clear state... I'm ${conditionIs}`
    : `I'm ${conditionIs}`;

  return <div>{jSx}</div>;
}
```

**if &&** (short-circuit evaluation)

```javascript
render() {
  const { conditionIs } = this.state;

  return (
    <div>
      {conditionIs && `I've a cristal clear state... I'm ${conditionIs}`}
    </div>
  );
}
}
```

#### Props and Functional component

**if > return** - if x, return z

```javascript
import React from 'react';

const Child = props => {
  if (!props.conditionIs) {
    return null;
  }

  return <div>Im Child! {props.conditionIs}</div>;
};

const App = () => (
  <div>
    Im App!
    <Child conditionIs="" />
  </div>
);

export default App;
```

Note: You will see that some people return empty elements like `<span>` or `<div>`. This is totally valid, however, in most cases you don´t want to "return something" (aka, add some element to the DOM) so, start always returning `null`, and switch to elements in case you want to render and show a particular message to the user.
