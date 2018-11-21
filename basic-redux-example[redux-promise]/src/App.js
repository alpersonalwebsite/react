import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchComments } from './actions';

class App extends Component {
  componentDidMount() {
    try {
      this.props.fetchComments();
    } catch (err) {
      console.log('Something went bad!');
    }

    /* Or you can do this...
      .then(data => data)
      .catch(err => console.log('Something went bad!'));
      */
  }

  renderComments = () => {
    if (this.props.comments.length > 0) {
      console.log(this.props.comments);
      return this.props.comments.map(comment => {
        return <li key={comment.id}>{comment.name}</li>;
      });
    } else {
      return (
        <ReactLoading type="bars" color="#000000" height={50} width={200} />
      );
    }
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchComments }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
