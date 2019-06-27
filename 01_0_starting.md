# First steps with React

## Trying React online
You can try `React online` through any of the major JS "sandboxes" or "playgrounds". I´m going to use [jsfiddle](https://jsfiddle.net), but, feel free to employ your favorite one. *PS*: Another great service is [codesandbox](https://codesandbox.io/) which allows you to download a compressed file with all the assets and code to run it locally once you are done.

*Note:* Remember you can also include the path (relative if your are working locally or absolute/CDN) to `React` and `ReactDOM` using the `src attribute of the <script> tag` which, basically, is what *jsfiddle* does when we add both libraries. 

---

**For development:** @16.x.x
```javascript
 <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
```

**For production:** @16.x.x
```javascript
<script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
```

---

In your fiddle, if you inspect the output, inside the iframe -> head you will find the 2 libraries plus `Babel`, needed for transpiling `ES* code` (aka, last JS code) into `browser-compatible JS`.

In *jsfiddle* be sure that you are including `React` and `ReactDOM`. In the `JavaScript input`, under Language, select `Babel + JSX`.
Great! You are ready to start playing!

Add within the markup or HTML a div with the id `root` (it could be any name).

```html
<div id="root"></div>
```

Inside the JS text-area, place...
```javascript
function MyFriend() {
  return(
    <div>
      <h1>Peter</h1>
      <div>More...</div>
    </div>
  )
}

var app = (
  <MyFriend />
)

ReactDOM.render(
  app,
  document.getElementById('root')
)
```

*The output will be:*
```
Peter
More...
```

... "same" as doing, with `plain JS` ...

```javascript
function MyFriend() {
  return(`
    <div>
      <h1>Peter</h1>
      <div>More...</div>
    </div>`
  );
}

const app = MyFriend();
const root = document.getElementById('root');
root.insertAdjacentHTML('beforeend', app)
```


Don´t worry too much about what´s going on! We will see it in detail during this and the upcoming lessons. For the moment, just remember that you can use `React + ReactDOM` with...
* `<script>` tag: locally/externally
* Node and npm

## Setting your local dev environment

We need to have -previously- installed...

* Node.js
* npm or yarn (npm is installed by default with Node.js)
* create-react-app: `npm install -g create-react-app`
(You can also use this to update a previous globally installed version of create-react-app)

Time to create our App.

CMD: C:\practice
```
create-react-app myapp
```

Enter to your app folder and let´s start cleaning...

Delete...
1. src/App.css
2. src/Logo.svg

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
