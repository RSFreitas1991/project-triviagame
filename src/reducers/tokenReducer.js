import { SAVE_TOKEN, SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  token: '',
  questions: '',
};

function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_TOKEN:
    return { ...state, token: action.token };
  case SAVE_QUESTIONS:
    return { ...state, questions: action.token };
  default:
    return state;
  }
}

export default token;
