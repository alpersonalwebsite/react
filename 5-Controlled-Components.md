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
