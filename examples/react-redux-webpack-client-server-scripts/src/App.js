import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchComments } from './actions';
//import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

import styles from './App.css';
import cssInJs from './App.css.js';

import rPI from './images/rPI-400x400.jpg';

const CommentsBox = styled('div')`
  background-color: lavender;
`;

/*
const listItem = css`
  list-style: none;
  padding: 0;
`;

const bold = css`
  font-weight: 'bold';
`;
*/

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
        <h1 style={cssInJs.sectionTitle}>List of comments 101</h1>
        <CommentsBox>{this.renderComments()}</CommentsBox>
        <img src={rPI} alt="Rasp. Pi Logo" className={styles.rPi} />
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
