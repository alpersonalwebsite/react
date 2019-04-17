import { FETCH_COMMENTS } from '../actions/types';

export default (state = [], action) => {
  console.log(action.payload);
  switch (action.type) {
    case FETCH_COMMENTS:
      const commentsPayload =
        action.payload.data.length > 10
          ? action.payload.data.slice(0, 10)
          : action.payload.data;
      return [...state, ...commentsPayload];

    default:
      return state;
  }
};
