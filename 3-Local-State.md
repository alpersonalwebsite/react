## Local State

What´s the difference between props and state...?
Props is read-only data.

```
class App extends Component {
  state = {
    yourName: 'Peter Pan'
  };
  render() {
    return (
      <div className="App">
        <h1>{`Hello ${this.state.yourName}`}</h1>
      </div>
    );
  }
```

<!--
TODO: Explain template literals
-->
