## Local State

<!-- TODO: What´s Local State -->

### Set state

We set the state through the state class property and access to it via: this.state.theProperty.
We use the state to determine changes in our UI.

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

**Every time the state changes the component will re-render**.

We should avoid initializing the state with props.
For example:

```
state = {
  yourName: this.props.userName
}
```

Why...?

1. If the props change (aka, are updated) the state will not reflect them.
2. To avoid data duplication.

### How to "update" or set new state Value

If we don´t care about the previous state, we can do the following...

```
componentDidMount() {
  this.setState({
    yourName: 'Wendy'
  });
}
```

If we care or the "new state" depends in the previous one...

```
componentDidMount() {
  this.setState(prevState => ({
    yourName: `Wendy, ex ${prevState.yourName}!`
  }));
}
```

#### Basic difference between props and state

* props: read-only data
* state: mutable data

Remember: in both cases, either when a Component receives props or the state is "updated", it will re-render.
