const INITIAL_STATE = {
  email: '',
};

function main(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_EMAIL':
    return { email: action.state };
  default:
    return state;
  }
}

export default main;
