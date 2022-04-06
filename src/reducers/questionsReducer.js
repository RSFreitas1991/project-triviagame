import { SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: '',
  isQuestionsSaved: false,
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return { ...state, questions: action.token, isQuestionsSaved: true };
  default:
    return state;
  }
}

export default questions;
