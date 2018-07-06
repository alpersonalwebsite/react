## Conditional Rendering

Previously we saw some conditional renderings like the "ternary operator". We are going to take back from that point and see different ways to render one or other content in relation to x-criteria.

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

**if/else** ():()

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
