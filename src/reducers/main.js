const INITIAL_STATE = {
  email: '',
  playerName: '',
  assertions: 0,
  score: 0,
  resetTimer: false,
  timerFreeze: false,

};

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_PLAYERNAME = 'SAVE_PLAYERNAME';
export const SAVE_SCORE = 'SAVE_SCORE';
export const RESET_TIMER = 'RESET_TIMER';
export const TIMER_FREEZE = 'TIMER_FREEZE';
export const RESET_LOGIN = 'RESET_LOGIN';
export const SAVE_RIGHT_ANSWERS = 'SAVE_RIGHT_ANSWERS';

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
  case TIMER_FREEZE:
    return { ...state, timerFreeze: action.state,
    };
  case RESET_LOGIN:
    return {
      ...state,
      email: '',
      playerName: '',
    };
  case SAVE_RIGHT_ANSWERS:
    return { ...state, assertions: action.state };
  default:
    return state;
  }
}

export default main;
