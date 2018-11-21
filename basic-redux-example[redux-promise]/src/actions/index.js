import { FETCH_COMMENTS } from './types';

import axios from 'axios';

const api = 'https://jsonplaceholder.typicode.com/';

const headers = {
  Accept: 'application/json'
};

export async function fetchComments() {
  const query = 'comments';
  const endPoint = `${api}${query}`;

  const request = await axios.get(endPoint, { headers });

  return {
    type: FETCH_COMMENTS,
    payload: request
  };
}

/* You can remove
.then(
  value => new Promise(resolve => setTimeout(() => resolve(value), 10000))
);
*/
