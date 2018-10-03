# React and forms

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

At future we will other ways of `conditional rendering`.

Note: The same criteria can be used to enable/disable "elements".

Before jumping to other topic, let´s address one possible issue in our code setting a context.
Daily, we interact with lists that filters (aka, update) its composition or results. Example: Amazon searcher and suggested keys/terms/products. However, as you probably noticed, there´s "some kind of delay" that allows you to receive suggestions per words or terms and not per letters.

Let´s modify our previous example.
Before closing the div, add...

```javascript
{
  this.state.yourName ? `Hello ${this.state.yourName}` : null;
}
```

Run your application.
Type your name, for example, Tinkerbell.
Every time you hit a letter the state is updated, the input shows the updated value of the state property and we also retrieve its value below.

However, we can agree in two things.

1. The UX of letter-by-letter is not great.
2. If we were attaching a method to the handler (like calling an API) before requesting for `Tinkerbell` we will be requesting for T... Ti... Tin... Yes! We would be making several unnecessary calls/requests that would affect performance.

**One solution** for this is `Debounce` which ensures that a `handler` is not fire or called so often.
For more information (also Throttling): https://www.npmjs.com/package/react-throttle

1. Install `react-throttle` package
2. Destructure and import Debounce
3. Add the Debounce component with the proper configuration wrapping the input
   (... and remover `value={yourName}` from your input, if not, it will not work. Don´t worry, Debounce will take care of showing the proper data/value)

```javascript
<Debounce time="400" handler="onChange">
  <input
    type="text"
    style={{ display: 'block' }}
    onChange={event => this.setState({ yourName: event.target.value })}
  />
</Debounce>
```

Try now to type your name... A lot better, no...?

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
