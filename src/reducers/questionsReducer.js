import { SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: '',
  isQuestionsSaved: false,
  isAnswerButtonDisabled: false,
};

export const CHANGE_BUTTON_STATE = 'CHANGE_BUTTON_STATE';

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return { ...state, questions: action.token, isQuestionsSaved: true };
  case CHANGE_BUTTON_STATE:
    return { ...state, isAnswerButtonDisabled: action.state,
    };
  default:
    return state;
  }
}

export default questions;
