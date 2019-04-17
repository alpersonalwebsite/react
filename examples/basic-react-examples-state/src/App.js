import React, { Component } from 'react';
import ClassComponent from './ClassComponent';
import FunctionalComponent from './FunctionalComponent';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Functional Component: useState</h1>
        <FunctionalComponent />

        <hr />

        <h1>Class based Component: state</h1>
        <ClassComponent />
      </React.Fragment>
    )
  }
}

export default App;