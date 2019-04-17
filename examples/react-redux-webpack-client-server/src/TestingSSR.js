import React, { Component } from 'react';

class TestingSSR extends Component {
  state = {
    label: 'SSR'
  };

  render() {
    return (
      <div>
        <div>{`Testing ${this.state.label}`}</div>
      </div>
    );
  }
}

export default TestingSSR;
