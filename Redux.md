## Redux

Let´s install some libraries.

```
npm install axios react-redux redux-promise redux --save
```

<!-- TODO: Add tp packages
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
