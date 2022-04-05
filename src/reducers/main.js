import { SAVE_TOKEN } from '../actions';

const INITIAL_STATE = {
  email: '',
  token: '',
};

function main(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_EMAIL':
    return { email: action.state };
  case SAVE_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
}

export default main;
