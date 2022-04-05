import { combineReducers } from 'redux';
import main from './main';
import token from './tokenReducer'

const rootReducer = combineReducers({
  main,
  token,
});

export default rootReducer;
