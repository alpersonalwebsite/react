import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchComments } from './actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchComments();
  }

  renderComments = () => {
    return this.props.comments.map(comment => {
      return <li key={comment.id}>{comment.name}</li>;
    });
  };

  render() {
    return (
      <div>
        <h1>List of comments 101</h1>
        <div>{this.renderComments()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ comments }) => {
  return {
    comments
  };
};

export default connect(mapStateToProps, { fetchComments })(App);
