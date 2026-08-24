import React, { Component } from 'react';
import uuid from 'uuid';

const Child = props => (
  <div>
    <div>
      I´m receiving...{' '}
      {props.onShowingHello.map(({ salutation, timestamp }, index) => (
        <li key={timestamp}>
          <input
            type="checkbox"
            id={salutation}
            name={salutation}
            value={salutation}
          />
          <label htmlFor={salutation}>{` ${salutation} - ${timestamp}`}</label>
        </li>
      ))}
    </div>
  </div>
);

class App extends Component {
  state = {
    ourSalutation: [
      { salutation: 'Hi', timestamp: '29519bf2-c68e-11e8-8f1c-f3e5f253a17f' },
      {
        salutation: 'Hello',
        timestamp: '3c72eae1-c68e-11e8-a508-89da3bf216bc'
      },
      { salutation: 'Hola', timestamp: '46af7641-c68e-11e8-9146-8343393a23eb' }
    ]
  };
  render() {
    return (
      <div className="App">
        <Child onShowingHello={this.state.ourSalutation} />
        <button
          onClick={() =>
            this.setState({
              ourSalutation: [
                { salutation: 'be', timestamp: uuid.v1() },
                ...this.state.ourSalutation
              ]
            })
          }
        >
          Add
        </button>
      </div>
    );
  }
}

export default App;
