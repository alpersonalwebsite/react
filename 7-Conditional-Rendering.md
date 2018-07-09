## Conditional Rendering

Previously we saw some conditional renderings like the "ternary operator". We are going to take back from that point and see different ways to render one or other content in relation to x-criteria.

#### State and Class

First cases we are going to be using the state property conditionIs to show one message or other, consigning as well, just the changes.
Note: since we are using local state, we are extending the Class instead of employing functional components.

**if/else**

```
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

**if/else** ? ():()

```
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

```
render() {
  const { conditionIs } = this.state;

  let jSx = conditionIs
    ? `I've a cristal clear state... I'm ${conditionIs}`
    : `I'm ${conditionIs}`;

  return <div>{jSx}</div>;
}
```

**if &&**

```
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

**if > return**

```
import React from 'react';

const Child = props => {
  if (!props.conditionIs) {
    return null;
  }

  return <div>I'm Child! {props.conditionIs}</div>;
};

const App = () => (
  <div>
    I'm App!
    <Child conditionIs="" />
  </div>
);

export default App;
```
