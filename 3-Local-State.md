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

Now, an example with several of the topics we covered.
We have a local (or component) state property: `friends`
Also, a method to delete a particular friend which is taken as argument. What we pass to this function is going to be "filtered out", setting the new state without the given friend.
In our JSX we map our friends array.
When you click in the button, we call the function `deleteFriend()` (in its proper context) passing a hard-coded value (`Wendy`) which is the one that we are going to pull out.

```
import React, { Component } from 'react';

class App extends Component {
  state = {
    friends: [
      { id: 0, name: 'Wendy' },
      { id: 1, name: 'Tinkerbell' },
      { id: 2, name: 'Cap. Hook' }
    ]
  };

  deleteFriend = friend => {
    this.setState(state => ({
      friends: state.friends.filter(eachFriend => eachFriend.name !== friend)
    }));
  };

  render() {
    return (
      <div>
        <div>
          {`Friends in local state: ${this.state.friends.map(
            eachFriend => eachFriend.name
          )}`}
        </div>
        <button onClick={() => this.deleteFriend('Wendy')}>
          Delete friend!
        </button>
      </div>
    );
  }
}

export default App;
```

Maybe you are thinking... Why do we use `() => this.deleteFriend('Wendy')`...? Simple answer: Just to avoid context issues. We want to be sure that we are referring to the Component´s context. For this, we have 2 options...

1. Wrap our event handler inside a fat arrow function (previous example)
2. Binding the context of `deleteFriend()` at the time we reference it.

Example \#2 with `bind()`

Change...

```
<button onClick={() => this.deleteFriend('Wendy')}>
  Delete friend!
</button>
```

With...

```
<button onClick={this.deleteFriend.bind(null, 'Wendy')}>
  Delete friend!
</button>
```

In this example, the `new function` that `.bind()` returns will have access to the `global context` (since we are using `null`) and will receive `'Wendy'` as parameter or argument.

... there´re others but these two are the most used ones.

---

You can see that we are **NOT initializing our state in the constructor** (as you will notice in several React tutorials).

```
import React, { Component } from 'react';

class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    name: 'Peter'
  };
}

...
}
```

First... Some contextual observations...

* `Constructor` is a method for creating and initializing an object created with a class.
* A constructor can use the super keyword to call the constructor of the `super` class.

Among other upcoming changes in ES, we have the [Class field declarations for JavaScript](https://github.com/tc39/proposal-class-fields) which will allow us to define class properties.

Until it becomes part of the standard, we can use Babel to transpile code (which will add the constructor for us).

So, the previous example would be...

```
import React, { Component } from 'react';

class App extends Component {
  state = {
    name: 'Peter'
  };
...
}
```

... and, since in this tutorial we are using `create-react-app` you don´t have to worry about wiring up Babel. It´s part of the package!
