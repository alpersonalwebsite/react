import { FETCH_COMMENTS } from './types';

import axios from 'axios';

const api = 'https://jsonplaceholder.typicode.com/';

const headers = {
  Accept: 'application/json'
};

export function fetchComments() {
  const query = 'comments';
  const endPoint = `${api}${query}`;

  const request = axios.get(endPoint, { headers });
  return {
    type: FETCH_COMMENTS,
    payload: request
  };
}
