import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      playerName: '',
      emailValidation: '',
      nameValidation: '',
    };
  }

  render() {
    const { email, playerName } = this.state;
    return (
      <div className="main">
        <fieldset>
          Email do Gravatar:
          <input type="text" data-testid="input-player-name" value={ playerName } />
          Nome do Jogador:
          <input type="text" data-testid="input-player-email" value={ email } />
        </fieldset>
      </div>
    );
  }
}

export default Login;
