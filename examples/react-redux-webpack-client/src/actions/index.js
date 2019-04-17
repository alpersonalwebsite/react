import { FETCH_COMMENTS } from './types';

import axios from 'axios';

const api = 'https://jsonplaceholder.typicode.com/';

const headers = {
  Accept: 'application/json'
};

//export function fetchComments() {
export const fetchComments = () => dispatch => {
  const query = 'comments';
  const endPoint = `${api}${query}`;

  /*
  const request = axios.get(endPoint, { headers });
  return {
    type: FETCH_COMMENTS,
    payload: request
  };
*/
  return axios.get(endPoint, { headers }).then(response => {
    dispatch({ type: FETCH_COMMENTS, payload: response.data });
  });
};
