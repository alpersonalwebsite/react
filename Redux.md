## Redux

<!-- What´s Redux
It´s not only for React.
It´s for handling state in a predictable way.
-->

<!-- TODO: First we should define the store. We have to think how the app will use that data -->

In Redux there´s a single Source of Truth: the store.
The state is read-only (immutable); components cannot write directly into the state.
Reducers create and return a new copy of the state.

When to use Redux...

1. Shared state through multiple Components. Let´s say that we have ComponentA with one child, ComponentB. We can easily pass data down with props. But, if we need to pass the data across several components (example: from A->B->-C->D) we should consider the global state or Redux store so we can instruct (without nesting) which components will have access to that data.
2. Caching: when we want to cache API requests/responses.

For other cases, we should opt for Local State.

#### Pure functions

We make changes in the state through pure functions.

What are Pure Functions...?

1. They depend just in the arguments that we pass.
2. Same arguments should return same results (this makes pure functions easy to test).
3. They don´t produce side effects (aka, NO interaction between the function and its outside scope. Example: HTTP calls)

<!-- TODO: Example of pure function and check definition and characteristics -->

One common example of pure and impure functions...

**Pure function: slice()**

```
let numbers = [1,2,3,4,5,6];
numbers.slice(3,5);
// Array [ 4, 5 ]

console.log(numbers);
// Array [1,2,3,4,5,6];
```

**Impure function: splice()**

```
let numbers = [1,2,3,4,5,6];
numbers.splice(3,5);
// Array [ 4, 5, 6 ]

console.log(numbers);
// Array [ 1, 2, 3 ];
```

#### Actions, Reducers and the store

To create the store we need at least one reducer which will receive all the actions (dispatched by the store) and return a new state of the application.

##### Actions

They are JS objects that describes an event that should update the application state. A Redux action must include the type property and, optionally, a payload (only send the necessary data).

```
{
  type: 'ADD_TO_TOTAL',
  amount: 10
}
```

Actions can be created (and returned) through **Action Creators**; these functions make the **Actions** portable and easy to test.

Also, for the value of the type property we should opt for CONSTANTS rather than strings (for practicality and to avoid errors related to typos).

```
const ADD_TO_TOTAL = 'ADD_TO_TOTAL';

const addToTotal = amount => ({
  type: ADD_TO_TOTAL,
  amount: 10
  });
```

##### Reducers

They are functions that receive 2 arguments: current state and the action that was dispatched. As we said before, they must be pure function.
They set the original state and return THEN the previous state or a new one.

Important: Please, read it carefully... Reducers must always return the state. We never modify the state directly. We create a new copy of the current state, modify the copy and return the copy (original state remains the same).

Never mutate the state...
Example: **AVOID doing this**

```
case ADD_TO_TOTAL:
  state.amount = action.amount;
  return state;
```

So... Our reducers will receive ALL actions. Inside the reducer (s) we switch the action by type and return the state for that match.

<!-- TODO: Reducer example -->

##### Store

Now... Let´s install some libraries.

```
npm install axios react-redux redux-promise redux --save
```

<!-- TODO: Add to packages
* axios
* react-redux
* redux-promise
* redux
-->

Create the folder **src/reducers** and inside it the following files...

**src/reducers/index.js**

```
import { combineReducers } from 'redux';
import commentsReducer from './commentsReducer'
const rootReducer = combineReducers({
  comments: commentsReducer
});

export default rootReducer;
```

Now, we are going to write our first reducer.

**src/reducers/commentsReducer.js**

```
import { FETCH_COMMENTS } from '../actions/types';

export default function(state = [], action) {

  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload.data;

    default:
      return state;
  }
}
```

Create the folder **src/actions** and inside it the following files...

**src/actions/types.js**

```
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
```

**src/actions/index.js**

```
import { FETCH_COMMENTS } from './types';

import axios from 'axios';

const api = 'https://jsonplaceholder.typicode.com/';

const headers = {
  Accept: 'application/json'
};

export function fetchComments() {
  const query = 'comments';
  const endPoint = `${api}${query}`;

  const request = axios.get(endPoint, { headers });
  return {
    type: FETCH_COMMENTS,
    payload: request
  };
}
```

Now we are going to wire up our store...

**src/index.js**

```
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxPromise))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
```

And now, in our component (example, App)

```
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchComments } from './actions';

const Child = () => {
  return <div>I'm Child!</div>;
};

class App extends Component {
  state = {
    friend: '',
    friends: []
  };

  componentDidMount() {
    this.props.fetchComments();
  }

  updateStateProperty = (stateProperty, statePropertyValue) => {
    this.setState({ [stateProperty]: statePropertyValue });
  };

  submitHandler = e => {
    e.preventDefault();

    this.setState(previousState => {
      return {
        friends: [...previousState.friends, this.state.friend],
        friend: ''
      };
    });
  };

  render() {
    const { friend } = this.state;
    const { fetchComments } = this.props;
    return (
      <div>
        <h1 className="title">Add your friends!</h1>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            name="friend"
            value={friend}
            onChange={event =>
              this.updateStateProperty(event.target.name, event.target.value)
            }
          />
          <button>Add friend!</button>
        </form>
        <Child />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchComments }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

If we check our Redux DevTools console...

![Redux DevTools SC](/images/redux-devTools-state.png)

---

Now, instead of dispatching in our Component we are going to resolve the promise and dispatch from our action creator using `redux-thunk` (we were using `redux-promise` to return an action with the payload property and a promise as value).

<!-- TODO: Add redux-thunk to packages -->

We have to add redux-thunk middleware to our **src/index.js**

```
const store = createStore(
  rootReducer,
  //composeEnhancers(applyMiddleware(ReduxPromise))
  composeEnhancers(applyMiddleware(reduxThunk))
);
```

Go to **src/actions/index.js**

```
import { FETCH_COMMENTS } from './types';

import axios from 'axios';

const api = 'https://jsonplaceholder.typicode.com/';

const headers = {
  Accept: 'application/json'
};

export const fetchComments = () => async dispatch => {
  const query = 'comments';
  const endPoint = `${api}${query}`;

  const request = await axios.get(endPoint, { headers });
  dispatch({ type: FETCH_COMMENTS, payload: request.data });
};
```

Go to **src/reducers/commentsReducer.js** and replace `return action.payload.data;` with `return action.payload;`

Go to your component, example: **src/App.js** and...

Replace...

```
import { fetchComments } from './actions';
```

with...

```
import * as actions from './actions';
```

Remove...

```
function mapDispatchToProps(dispatch) {
return bindActionCreators({ fetchComments }, dispatch);
}
```

Replace...

```
export default connect(mapStateToProps, mapDispatchToProps)(App);
```

with...

```
export default connect(mapStateToProps, actions)(App);
```

Check your Redux DevTools. You should have the same results as previously.
