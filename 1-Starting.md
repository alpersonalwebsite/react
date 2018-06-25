We need to have installed...

* node
* npm or yarn
* create-react-app

Then we have to create our App.
CMD: C:\practice

```
create-react-app myapp
```

Enter to your app folder and let´s start cleaning...

Delete...

1. src/App.css
2. src/Logo.svg

<!--
TODO: How we create components
-->

Replace the content of src/App.js with...

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

If we grab the JSX and transpile it with [Babel](http://babeljs.io/repl/) (be sure that you are selecting the following presets: es2015, es2016, es2017, stage-2 and react) you will see:

```
"use strict";

React.createElement(
  "div",
  { className: "App" },
  React.createElement(
    "h1",
    null,
    "Hello World!"
  )
);
```

Install some packages
CMD: C:\practice\myapp

```
npm install react-router-dom --save
```

<!--
TODO: How to pass data or props...
-->

<!--
TODO: Compose components together
-->
