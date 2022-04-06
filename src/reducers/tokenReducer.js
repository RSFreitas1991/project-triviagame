import { SAVE_TOKEN, SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  token: '',
  isTokenSaved: false,
  questions: '',
  isQuestionsSaved: false,
};

function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_TOKEN:
    return { ...state, token: action.token, isTokenSaved: true };
  case SAVE_QUESTIONS:
    return { ...state, questions: action.token, isQuestionsSaved: true };
  default:
    return state;
  }
}

export default token;
