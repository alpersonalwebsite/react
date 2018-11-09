# React and forms elements

## Controlled components

These are components that render a form (or form element) and where the "source of Truth" (aka, data) lives inside the component state rather than in the DOM; we start with an `initial value` and set the new value of the state property through a callback.

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

Before proceeding, you should know that `Controlled Components` refer to:

* inputs
* selects
* textareas
  ... all of them, have their own state which is based on the user´s action (the information he provides, the option that he selects, the checkbox that he checks, et).

Selects: To avoid the warning, `` Warning: Use the`defaultValue`or`value`props on <select> instead of setting `selected`on <option>. ``, we use the attribute value on select instead of the selected one on the particular option. Remember that there´s a strict relation between state and element, so if you want to start showing (aka, selecting) a particular option, you should initialize your state with it.

For easy handling of "radio" and "check-boxes" you can use `react-radio-group` and `react-checkbox-group`.

Quick radio example: `react-radio-group`
With this dependency you will avoid: code duplication, repetitive in-line conditional to determine if input should be checked, complex logic to update state in relation to user´s selection.

```javascript
import React, { Component } from 'react';
import { RadioGroup, Radio } from 'react-radio-group';

class App extends Component {
  state = {
    selectedName: 'TinkerBell'
  };

  render() {
    return (
      <div className="App">
        <RadioGroup
          name="names"
          selectedValue={this.state.selectedName}
          onChange={value => this.setState({ selectedName: value })}>
          <Radio value="Peter" />Peter
          <Radio value="Wendy" />Wendy
          <Radio value="TinkerBell" />TinkerBell
        </RadioGroup>
      </div>
    );
  }
}

export default App;
```

TinkerBell will be selected by default. Then, every-time you click on one of the inputs>radio, the property of the state object will be updated, so the selection (value). Inspect the changes on the state with React DevTools add-on.

Quick radio example: `react-checkbox-group`

```javascript
import React, { Component } from 'react';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

class App extends Component {
  state = {
    selectedNames: ['TinkerBell', 'Peter']
  };

  handleChange = userSelectionNames => {
    this.setState({
      selectedNames: userSelectionNames
    });
  };

  render() {
    return (
      <div className="App">
        <CheckboxGroup
          checkboxDepth={2}
          name="fruits"
          value={this.state.selectedNames}
          onChange={this.handleChange}>
          <label>
            <Checkbox value="Peter" /> Peter
          </label>
          <label>
            <Checkbox value="Wendy" /> Wendy
          </label>
          <label>
            <Checkbox value="TinkerBell" /> Tinkerbell
          </label>
        </CheckboxGroup>
      </div>
    );
  }
}

export default App;
```

#### .map() and key attribute

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

Quick Note: We are re-using the method `updateStateProperty()`. Previously, we were utilizing it inside a `div` so we did not have other "clean way" of passing extra data (data outside the `scope of the own event`) when we click on that element (div). We were doing something like...

```javascript
<div onClick={() => props.onUpdateStateProperty('yourName', 'Wendy')}>
  Change state...
</div>
```

Here, we can pass the event (all the info will be inside the `event object`) and access to the properties inside it from the own handler:

```javascript
updateStateProperty = event => {
  const stateProperty = event.target.name;
  const statePropertyValue = event.target.value;
  this.setState({ [stateProperty]: statePropertyValue });
};
```

And then, we bind and attach the handler in this way:

```javascript
<input
  type="text"
  name="name"
  value={this.state.name}
  onChange={event => this.updateStateProperty(event)}
/>
```

If you want to keep you return as clean as you can... This will be a good solution... (even when functionality remains the same).

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

## Uncontrolled components

We talked about inputs (text, radio, check-box), selects, textareas... But what about `input type="file"`...?
Well, since there is not another way than the own user selecting the file and interacting with the File API, the value that this element holds is "read-only" (as props) and the component uncontrolled.

You will find some tutorials explaining the agnostic benefits (cases like when you are using multiple frameworks and libraries) of turning all elements into uncontrolled components. However, remember that this goes against React nature: taking as "Source of Truth" the DOM node instead of a particular state tied to the element.

Try to avoid as much as you can the use of "uncontrolled components"... However, if you are thinking what would be an "uncontrolled component" with an "input of type text element"... Here´s your answer...

Example:

```javascript
import React, { Component } from 'react';

class App extends Component {
  handleSubmit = () => {
    const name = this._name.value;
    const lastName = this._lastName.value;
    alert(`Hello ${name} ${lastName}`);
  };

  render() {
    return (
      <div>
        Name: <input ref={input => (this._name = input)} type="text" />
        Lastname: <input ref={input => (this._lastName = input)} type="text" />
        <button onClick={this.handleSubmit}>Send data!</button>
      </div>
    );
  }
}

export default App;
```

Probably, uncontrolled forms elements will remember you the `old vanilla JavaScript or jQuery way` of grabbing and interacting with data: someone provides information and through a particular `event` we collect and process that data.

So, if you are just planning to pull data from "elements" and submit it... Well, you could technically use "uncontrolled components" without major damage. Remind that you can also utilize "controlled" ones and take advantage of real-time elements validation, UI or screen for particular states, among others features.
