const INITIAL_STATE = {
  email: '',
  playerName: '',
};

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_PLAYERNAME = 'SAVE_PLAYERNAME';

function main(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_EMAIL:
    return { ...state, email: action.state };
  case SAVE_PLAYERNAME:
    return { ...state, playerName: action.state,
    };
  default:
    return state;
  }
}

export default main;
