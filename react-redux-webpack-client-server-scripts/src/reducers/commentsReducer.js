import { FETCH_COMMENTS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      const commentsPayload =
        action.payload.length > 10
          ? action.payload.slice(0, 10)
          : action.payload;
      return [...state, ...commentsPayload];

    default:
      return state;
  }
};
