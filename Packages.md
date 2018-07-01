## Packages

### PropTypes

Used to check props passed to our components against definitions.
More info: https://www.npmjs.com/package/prop-types

CMD or terminal:

```
npm install --save prop-types
```

Example use:

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Child = props => <div>I'm Child...</div>;

class App extends Component {
  state = {
    yourName: 'Peter Pan',
    yourAge: 30,
    yourNumbers: [1, 2, 3, 4]
  };

  render() {
    return (
      <div className="App">
        I'm App
        <Child {...this.state} />
      </div>
    );
  }
}

Child.propTypes = {
  yourName: PropTypes.string,
  yourAge: PropTypes.number,
  yourNumbers: PropTypes.array
};

export default App;
```

If you don´t have installed React Developer Tools, please, install it now:

* Firefox:https://addons.mozilla.org/en-US/firefox/addon/react-devtools/
* Chrome: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en

Refresh the page and open your Browser Developer Tools.
Click in the React tab and expand your App view.

![React DevTools: Checking props](/images/react-devTools-propTypes.png)

You can see that the App component has the following properties in its State:

```
State
    yourAge: 30
    yourName:"Peter Pan"
    yourNumbers: Array[4]
      0: 1
      1: 2
      2: 3
      3: 4
```

And, if you click in Child, you will see the following properties...

```
Props read-only
    yourAge: 30
    yourName: "Peter Pan"
    yourNumbers: Array[4]
```

Great! Everything is working as expected, however, we are not checking yet if PropTypes is working.

Return to your Console tab.
Refresh the page. You should not see any error.

Now, change the expected type of yourAge property to string

```
Child.propTypes = {
  yourName: PropTypes.string,
  yourAge: PropTypes.string,
  yourNumbers: PropTypes.array
};
```

In the Console you will see...

```
Warning: Failed prop type: Invalid prop `yourAge` of type `number` supplied to `Child`, expected `string`.
    in Child (at App.js:17)
    in App (at index.js:7)
```

Excellent! Everything is working as expected. Change other properties and ensure that you understand what´s happening. Once you finish, please, be sure that you are setting the right types.
