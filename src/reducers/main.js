const INITIAL_STATE = {
  email: '',
  playerName: '',
  assertions: 0,
  score: 0,

};

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_PLAYERNAME = 'SAVE_PLAYERNAME';
export const SAVE_SCORE = 'SAVE_SCORE';
export const RESET_LOGIN = 'RESET_LOGIN';

function main(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_EMAIL:
    return { ...state, email: action.state };
  case SAVE_PLAYERNAME:
    return { ...state, playerName: action.state,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: action.state,
    };
  case RESET_LOGIN:
    return {
      ...state,
      email: '',
      playerName: '',
    };
  default:
    return state;
  }
}

export default main;
