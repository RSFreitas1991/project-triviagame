import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newAction, fetchToken, fetchQuestions } from '../actions';
import { SAVE_EMAIL, SAVE_PLAYERNAME } from '../reducers/main';

import '../css/login.css';

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
    this.getToken = this.getToken.bind(this);
  }

  componentDidUpdate() {
    const { token, getQuestions, isQuestionsSaved, history } = this.props;
    if (token.length && isQuestionsSaved === false) {
      getQuestions(token);
    }
    if (isQuestionsSaved === true) {
      history.push('/gamescreen');
    }
  }

  getToken() {
    const { sendToken, saveEmailAndPlayerName } = this.props;
    const { email, playerName } = this.state;
    sendToken();
    saveEmailAndPlayerName(email, SAVE_EMAIL);
    saveEmailAndPlayerName(playerName, SAVE_PLAYERNAME);
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
      <div className="login-page">
        <div className="main">
          <h2 className="login-title">Faça Login para começar a jogar!</h2>
          <fieldset className="fieldset">
            <input
              type="email"
              name="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              value={ email }
              className="login-input"
              placeholder="Email do Gravatar"
              required
            />
            <input
              type="text"
              name="playerName"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              value={ playerName }
              className="login-input"
              placeholder="Nome do Jogador:"
            />
            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.getToken }
              disabled={ submitButton }
              className="login-button"
            >
              Play
            </button>
          </fieldset>
          <button
            type="button"
            data-testid="btn-settings"
            className="login-settings-button"
          >
            <Link to="/settings">Configurações</Link>
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendToken: PropTypes.func.isRequired,
  saveEmailAndPlayerName: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  isQuestionsSaved: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmailAndPlayerName: (state, type) => dispatch(newAction(
    state, type,
  )),
  sendToken: () => dispatch(fetchToken()),
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

const mapStateToProps = (state) => ({
  token: state.token,
  isQuestionsSaved: state.questions.isQuestionsSaved,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
