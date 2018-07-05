## Controlled components

These are components that render a form (or form element) and where the "source of Truth" (aka, data) lives inside the component state rather than in the DOM.

```
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

```
<div>
  {yourName.length < 3 && (
    <span>Name should be at least 3 chars...!</span>
  )}
</div>
```

Same example but using the ternary operator:

```
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

```
const { yourName, yourAge } = this.props;
/*
  This is like...
  const yourName = this.props.yourName;
  const yourAge = this.props.yourAge;
*/

const { yourName, yourAge } = this.state;
```

Then, use yourName or yourAge instead of this.props.yourName or this.props.yourAge
