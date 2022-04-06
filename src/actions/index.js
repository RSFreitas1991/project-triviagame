export const SAVE_TOKEN = 'SAVE_TOKEN';

export const newAction = (state, action) => ({ type: action, state });

export const getToken = (token) => ({ type: SAVE_TOKEN, token });

export function fetchToken() {
  return async (dispatch) => {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await request.json();
    dispatch(getToken(response.token));
  };
}

// export default newAction;
