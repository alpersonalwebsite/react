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

1. Shared state through multiple Components. Let´s say that we have ComponentA with one child, ComponentB. We can easily pass data down with props. But, if we need to pass the data across several components (example of "prop threading": from A->B->-C->D) we should consider the global state or Redux store so we can instruct (without nesting) which components will have access to that data.
2. Caching: when we want to cache API requests/responses.

For other cases, we should opt for Local State.

#### Pure functions

We make changes in the state through pure functions.

What are Pure Functions...?

1. They depend just in the arguments that we pass.
2. Same arguments should return same results (this makes pure functions easy to test).
3. They don´t produce side effects (aka, NO interaction between the function and its outside scope. Example: HTTP calls)

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

They are functions that receive 2 arguments: current state and the action that was dispatched. As we said before, they must be pure functions.
They set the original state and return THEN the previous state or a new one.

Important: Please, read it carefully... Reducers must always return the state. We never modify (aka, mutate) the state directly. We create a new copy of the current state, modify the copy and return the copy (original state remains the same).

Every time that we talk about **state** in a Reducer, we are referring to the particular piece of state that the "concerned reducer" is responsible for.

Never mutate the state...
Example: **AVOID doing this**

```
case ADD_TO_TOTAL:
  state.amount = action.amount;
  return state;
```

So... Our reducers will receive ALL actions. Inside the reducer (s) we switch the action by type and return the state for that match.

**src/reducers/sumReducer.js**

```
import { ADD_TO_TOTAL } from '../actions/types';

export default (state = 0, action) => {
  switch (action.type) {
    case ADD_TO_TOTAL:
      return state + action.amount;

    default:
      return state;
  }
};
```

###### Root reducer

`createStore(reducer, [enhancer)` takes a single reducer, so... If we need to pass more than one, we should create a `rootReducer`, a reducer that utilize composition ("combined reducers") to call more than one reducer.

Example:

```
import { combineReducers } from 'redux';
import commentsReducer from './commentsReducer';
import postsReducer from './postsReducer';

const rootReducer = combineReducers({
  comments: commentsReducer,
  posts: postsReducer
});

export default rootReducer;
```

Note: `combineReducers()` will reduce the reducers to a single or main one, which will call every "child reducer" and set/handle each property of our state.

So for the previous reducers the shape of the store will be...

```
{
  comments: [],
  posts: []
}
```

`createStore()` recives as second argument an enhancer. We can provide our `middlewares` using `applyMiddleware()`; this method accept multiple arguments (aka, middlewares)

##### Store

It holds the application state.
It dispatches actions that will hit the reducers which will return the state.

We create the store through the method `createStore(reducer)`

```
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer);

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

The `Store` has the following methods:

<!-- TODO: Check if are more -->

* `getState()` > returns current state of the store
* `dispatch(action)` > sends the action to all the reducers
* `subscribe(callback)` > will execute the callback when the state changes

IMPORTANT: In Redux (as in React or programming in general) you don´t duplicate data. Remember that you have `once Source of Truth`: the Store. Also, put special attention to the shape of the Store... Try to keep it as simple and shallow as you can obviating complex nested structures.

---

**App modularity or skeleton**

Usually, the most common ways to organize our code is through:

* Types
* Features

Personally, for "regular projects" I opt for the following structure...

```
src
  actions
  components
    Header
    Footer
  css
  data
  hoc
  images
  pages
    Homepage
      index.js
      HomeAdvice
  reducers
  store
```

So, for example, inside `src/Homepage` (main route) I have my `index.js` where I import reusable components that I store inside `src/components`, but also, those which are particular tied to the `src/Homepage` one like `src/Homepage/HomeAdvice`.

If you want to easily reuse your components in other projects, you should probably go with features. In this case, you will have everything that component needs inside it (aka, its folder).

```
src  
  Menu
    actions.js
    index.js
    reducers.js
```

---

<!-- TODO: Check React and LAYOUTS -->

##### react-redux

It allows us to dispatch actions and access to our Store from inside our components.
For this, we use the Provider tag and the connect() method.

* Provider wraps our application taking the store as prop, settings the store context and passing it down to child components.
* Connect we can dispatch actions and access to specific parts of our state. It returns a `curried function`.

```
...
connect(mapStateToProps, mapDispatchToProps)(App)
```

Note: **Connected components** (aka, Components using the connect() method) are also called `Smart Components` or `Containers`. Some people place them inside `src/containers/`.

Usually you connect the most parent Component that cares about a particular piece of state.
For example... If you have a **"list of notes"**, you will connect `ListofNotes.js` which is going to pass down as props the particular note to `Note.js`

###### mapStateToProps(state, [ownProps])

Define which data are we going to pass to the component. That data is going to be available through props.

Example:

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchComments();
  }
  render() {
    return (
      <div>{`Comment with id 1: ${JSON.stringify(
        this.props.comments[0]
      )}`}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments
  };
}

export default connect(mapStateToProps, actions)(App);
```

Result:

```
Comment with id 1: {"postId":1,"id":1,"name":"id labore ex et quam laborum","email":"Eliseo@gardner.biz","body":"laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"}
```

As you can see, we access through `this.props` (Class Component) or `props` (Functional Component).

Remember that you can `destructure`

Example for **Functional Component**

```
const App = ({ comments }) => {
  <div>{`Comment with id 1: ${JSON.stringify(comments[0])}`}</div>
};
```

Note: Once you load the page, for a fraction of seconds you will see
`Comment with id 1: undefined`; this is because we are dealing with an async operation (an operation that takes some time to resolve).

We can provide a better user experience showing a `loading` message.
Example:

```
{!this.props.comments[0]
  ? 'I am loading...'
  : `Comment with id 1: ${JSON.stringify(this.props.comments[0])}`}
```

Until `this.props.comments[0]` is something (or, is different than `undefined`), we show the `'I am loading...'` message. It is not a must, but, it offers a better "contextual" interaction.

<!-- TODO: Add `ownProps` fromn React Notes 7 -->

###### mapDispatchToProps()

Allows us to bind dispatch() to our action creators before they hit the component.

<!-- TODO: Add `mapDispatchToProps()` fromn React Notes 7 -->

---

What is a `curried or partial app`...?
It happens when we call a function without ALL its argument. The result will be a new function which will be waiting for the next argument.

Example:

```
add = a => {
  return (b) => {
    return a + b;
  }
}

console.log(add(1)(3));
// 4
```

We can simplify it to

```
add = a => b => a + b;

console.log(add(1)(3));
// 4
```

Example passing one value, storing and then passing the other

```
add = a => b => a + b;

const addition = add(1);
console.log(addition);
/*
 function (b) {
    return a + b;
  }
*/

console.log(addition(3));
//4
```

Note: We have 3 functions and we are returning 2 (take this as a general rule)

---

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

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload;

    default:
      return state;
  }
};
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

Note: remember that we can destructure or pull properties from objects.
So...

```
function mapStateToProps(state) {
  return {
    comments: state.comments
  };
}
```

Can be replaced with...

```
function mapStateToProps({ comments }) {
  return {
    comments
  };
}
```

Since key and value are the same (comments) we can simplify it just to `comments`

... and, since we love ES6, we can use `fat arrow function` and return our `object`

```
const mapStateToProps = ({ comments }) => {
  return {
    comments
  };
};
```

---

Now, instead of dispatching in our Component we are going to resolve the promise and dispatch from our action creator using `redux-thunk` (we were using `redux-promise` to return an action with the payload property and a promise as value).

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

export const fetchComments = () => dispatch => {
  const query = 'comments';
  const endPoint = `${api}${query}`;

  return axios.get(endPoint, { headers }).then(response => {
    dispatch({ type: FETCH_COMMENTS, payload: response.data });
  });
};
```

Go to **src/reducers/commentsReducer.js** and replace `return action.payload.data;` with `return action.payload;`

Go to your component, example: **src/App.js** and...

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
export default connect(mapStateToProps, { fetchComments })(App);
```

Check your Redux DevTools. You should have the same results as previously.

---

Several times we referred to Middlewares...
**What is a Middleware...?** Is Logic that intercepts a process (or request) producing a side effect. Middlewares can be chained.
In Redux we use Middlewares to intercept dispatched
actions modifying them (or not) before they hit the reducers. We can also dispatch other actions or execute some logic at the dispatching time or layer.

What is `redux-thunk`...? It´s a thunk middleware for Redux. We can use it for async HTTP requests (Redux only supports synchronous data flow) for example, when we are dealing/interacting with a server, delaying, dispatching, or dispatching if certain condition is met (like a response to our request).

With thunks we can return from the action creator a function instead of an object and intercept these actions before dispatching.
