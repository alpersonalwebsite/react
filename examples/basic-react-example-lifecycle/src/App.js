import React, { Component } from 'react';
import Child from './Child';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('App > constructor()')
  }

  state = {
    name: 'Peter'
  }

  static getDerivedStateFromProps(props, state) {
    console.log('App > getDerivedStateFromProps()', props);
    return state;
  }

  componentWillMount() {
    console.log('App > componentWillMount()');
  }

  componentDidMount() {
    console.log('App > componentDidMount()');
  }

  render() {

    const { name } = this.state;

    console.log('App > render()');

    return (
      <React.Fragment>
        <div>
          Hi!
          <button onClick={() => this.setState({ name: 'Wendy' })}>Change My Name!</button>
        </div>
        <Child name={name} />
      </React.Fragment>
    )
  }
}

export default App;