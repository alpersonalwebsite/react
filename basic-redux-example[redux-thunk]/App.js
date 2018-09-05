import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchComments } from './actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchComments();
  }

  renderComments = () => {
    return this.props.comments.slice(0, 10).map(comment => {
      return <li key={comment.id}>{comment.name}</li>;
    });
  };

  render() {
    return (
      <div>
        <h1>List of comments</h1>
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

/*
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchComments }, dispatch);
};
*/

export default connect(mapStateToProps, { fetchComments })(App);
