import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import rootReducer from './reducers';

// App is wrapped in connect(), so it reads the store out of React context and
// throws without one:
//
//   Invariant Violation: Could not find "store" in the context of "Connect(App)"
//
// The version of this file that create-react-app generates renders <App /> on its
// own, which is correct until the day you connect it to redux, and then it is a
// test that always fails. Building a real store here rather than mocking one keeps
// the test honest about what it renders: the reducers run, so a reducer that throws
// on its initial action fails this test too.
it('renders without crashing', () => {
  const store = createStore(rootReducer, applyMiddleware(reduxThunk));
  const div = document.createElement('div');

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
