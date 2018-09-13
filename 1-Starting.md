We need to have installed...

* node
* npm or yarn
* create-react-app: npm install -g create-react-app

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

If we grab the JSX and transpile it with [Babel](http://babeljs.io/repl/) (be sure that you are selecting the following presets: es2015, es2016, es2017, stage-2 and react) you will see:

```javascript
'use strict';

React.createElement(
  'div',
  { className: 'App' },
  React.createElement('h1', null, 'Hello World!')
);
```

Note about render() method: It should only be used to render or display data; never for async calls.

**createElement()**

Returns a JavaScript object
It takes 3 arguments:

1. tag
2. attributes
3. content or element´s children

Example:

```javascript
const element = React.createElement(
  'div',
  null,
  React.createElement('strong', null, 'Hello world!')
);
```

**ReactDOM.render()**

Example: src/index.js

```javascript
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

Note: Remember React Apps usually have a single root element.

public/index.html

```html
<div id="root"></div>
```

### Elements

As we saw previously, we create elements through `React.createElement()`.
An element is an object that describes what we want to show in the screen.
Well, it is (in fact) an object representation of a DOM node.

```javascript
const element = <div>Im an element!</div>;
```

<!--
TODO: Compose components together
-->
