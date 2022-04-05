import React from 'react';
import { connect } from 'react-redux';
/* import PropTypes from 'prop-types'; */
import newAction from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      playerName: '',
    /*       emailValidation: '',
      nameValidation: '',
      submitButton: '', */
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, playerName } = this.state;
    return (
      <div className="main">
        <fieldset className="fieldset">
          Email do Gravatar:
          <input
            type="email"
            name="email"
            data-testid="input-player-email"
            onChange={ this.handleChange }
            value={ email }
            required
          />
          Nome do Jogador:
          <input
            type="text"
            name="playerName"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            value={ playerName }
          />
          <button
            type="button"
            onClick={ () => console.log('cliquei') }
            disabled={ false }
          >
            Play
          </button>
        </fieldset>
      </div>
    );
  }
}

/* Login.propTypes = {
  myFirstDispatch: PropTypes.func.isRequired,
}; */

const mapDispatchToProps = (dispatch) => ({
  myFirstDispatch: (state) => dispatch(newAction(state, 'SAVE_EMAIL')) });

export default connect(null, mapDispatchToProps)(Login);
