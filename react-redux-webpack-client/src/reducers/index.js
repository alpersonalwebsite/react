import { combineReducers } from 'redux';
import commentsReducer from './commentsReducer';
const rootReducer = combineReducers({
  comments: commentsReducer
});

export default rootReducer;
