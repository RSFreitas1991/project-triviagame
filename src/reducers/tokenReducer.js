import { SAVE_TOKEN, CLEAR_TOKEN } from '../actions';

const INITIAL_STATE = '';

function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_TOKEN:
    return action.token;
  case CLEAR_TOKEN:
    return action.state;
  default:
    return state;
  }
}

export default token;
