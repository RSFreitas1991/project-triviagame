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
      emailValidation: false,
      nameValidation: false,
      submitButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.nameValidation = this.nameValidation.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.formValidation());
  }

  nameValidation() {
    const { playerName } = this.state;
    const playerLength = 1;
    if (playerName.length >= playerLength) {
      this.setState({
        nameValidation: true,
      }, () => this.submitButtonChange());
    } else {
      this.setState({
        nameValidation: false,
      }, () => this.submitButtonChange());
    }
  }

  emailValidation() {
    const { email } = this.state;
    const emailState = email.match(/@/g);
    const secondHalf = email.match(/@(.*)/);
    const thirdHalf = email.match(/\.(.*)/);
    if (emailState !== null
      && emailState.length === 1
      && secondHalf[1].length > 0
      && thirdHalf !== null
      && thirdHalf[1].length > 0) {
      this.setState({
        emailValidation: true,
      }, () => this.submitButtonChange());
    } else {
      this.setState({
        emailValidation: false,
      }, () => this.submitButtonChange());
    }
  }

  submitButtonChange() {
    const { emailValidation, nameValidation } = this.state;
    if (emailValidation === true && nameValidation === true) {
      this.setState({
        submitButton: false,
      });
    } else {
      this.setState({
        submitButton: true,
      });
    }
  }

  formValidation() {
    this.emailValidation();
    this.nameValidation();
  }

  render() {
    const { email, playerName, submitButton } = this.state;
    return (
      <div className="main">
        <fieldset className="fieldset">
          Email do Gravatar:
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
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
            data-testid="btn-play"
            onClick={ () => console.log('cliquei') }
            disabled={ submitButton }
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
