## Controlled components

These are components that render a form (or form element) and where the "source of Truth" (aka, data) lives inside the component state rather than in the DOM.

```javascript
class App extends Component {
  state = {
    yourName: ''
  };

  render() {
    return (
      <div className="App">
        <span>Your name: </span>
        <input
          type="text"
          value={this.state.yourName}
          onChange={event => this.setState({ yourName: event.target.value })}
        />
      </div>
    );
  }
}

export default App;
```

You can use React Developer Tools to check the state of your Component.
Open your browser Developer Tools, click in React tab and select your Component, in this case <App />
At the right you will find:

* props
* state

Make changes on the input and see how your state is set through the input and, consequently, your state set the value of the input (aka, what you are seeing in the own input).

Also, you can use conditional rendering for instant validation.

Example:

```javascript
<div>
  {yourName.length < 3 && <span>Name should be at least 3 chars...!</span>}
</div>
```

Same example but using the ternary operator:

```javascript
<div>
  <span>
    {yourName.length < 3 ? 'Name should be at least 3 chars...!' : ''}
  </span>
</div>
```

At future we will see more Conditional Renderings.

Note: The same criteria can be used to enable/disable "elements".

#### Destructuring

In React you will use destructuring (ES6) a lot. Even when it´s not a functional requisite, it makes your code look cleaner and it follows the Community´s standards.

So... What is Destructure...?
Just a convenient way of pulling out values from object and array objects.

Examples:

* When you are dealing with props or state, you can do:

```javascript
const { yourName, yourAge } = this.props;
/*
  This is like...
  const yourName = this.props.yourName;
  const yourAge = this.props.yourAge;
*/

const { yourName, yourAge } = this.state;
```

Then, use yourName or yourAge instead of this.props.yourName or this.props.yourAge

##### One note about working with forms

By default, when you submit a form, the fields (name and value) are serialized in the URL:

Example:
http://localhost:3000/?name=Peter&lastName=Pan&age=30

```javascript
import React, { Component } from 'react';

class App extends Component {
  state = {
    name: '',
    lastName: '',
    age: 0
  };

  updateStateProperty = (stateProperty, statePropertyValue) => {
    this.setState({ [stateProperty]: statePropertyValue });
  };

  render() {
    const { name, lastName, age } = this.state;

    return (
      <div>
        <form>
          <input
            type="text"
            name="name"
            value={name}
            onChange={event =>
              this.updateStateProperty(event.target.name, event.target.value)
            }
          />
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={event =>
              this.updateStateProperty(event.target.name, event.target.value)
            }
          />
          <input
            type="text"
            name="age"
            value={age}
            onChange={event =>
              this.updateStateProperty(event.target.name, event.target.value)
            }
          />
          <button>Submit!</button>
        </form>
      </div>
    );
  }
}

export default App;
```

Alternatively, we can use packages like form-serialize; this library, allows us to serialize the fields (names and values) into an object and, preventing the default behavior of form (submit), we can show that data without reloading the page.

Example: (you need to have form-serialize installed through npm or yarn. For more information and HOW to use it, please visit: https://www.npmjs.com/package/form-serialize)

Example:

```javascript
import React, { Component } from 'react';
import formSerialize from 'form-serialize';

class App extends Component {
  state = {
    name: '',
    lastName: '',
    age: 0
  };

  updateStateProperty = (stateProperty, statePropertyValue) => {
    this.setState({ [stateProperty]: statePropertyValue });
  };

  submitHandler = e => {
    e.preventDefault();
    const userObject = formSerialize(e.target, { hash: true });
    console.log(userObject);
  };

  render() {
    const { name, lastName, age } = this.state;

    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={event =>
              this.updateStateProperty(event.target.name, event.target.value)
            }
          />
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={event =>
              this.updateStateProperty(event.target.name, event.target.value)
            }
          />
          <input
            type="text"
            name="age"
            value={age}
            onChange={event =>
              this.updateStateProperty(event.target.name, event.target.value)
            }
          />
          <button>Submit!</button>
        </form>
      </div>
    );
  }
}

export default App;
```

Result: (check your Dev Tools Console)

```javascript
Object { name: "Peter", lastName: "Pan", age: "30" }      App.js:18
```
