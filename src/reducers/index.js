import { combineReducers } from 'redux';
import main from './main';
import token from './tokenReducer';
import questions from './questionsReducer';

const rootReducer = combineReducers({
  main,
  token,
  questions,
});

export default rootReducer;
