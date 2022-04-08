const INITIAL_STATE = {
  email: '',
  playerName: '',
  assertions: 0,
  score: 0,
  resetTimer: false,

};

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_PLAYERNAME = 'SAVE_PLAYERNAME';
export const SAVE_SCORE = 'SAVE_SCORE';
export const RESET_TIMER = 'RESET_TIMER';

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
  case RESET_TIMER:
    return { ...state, resetTimer: action.state,
    };
  default:
    return state;
  }
}

export default main;
