import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { newAction, CLEAR_TOKEN } from '../actions';
import { RESET_LOGIN } from '../reducers/main';

class GoHome extends Component {
  goHome = () => {
    const { history, resetLogin, clearToken } = this.props;
    resetLogin();
    clearToken();
    history.push('/');
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ this.goHome }
      >
        Home
      </button>
    );
  }
}

GoHome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  resetLogin: PropTypes.func.isRequired,
  clearToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetLogin: () => dispatch(newAction(null, RESET_LOGIN)),
  clearToken: () => dispatch(newAction('', CLEAR_TOKEN)),
});

export default connect(null, mapDispatchToProps)(GoHome);
