import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { RESET_LOGIN } from '../reducers/main';
import { newAction } from '../actions';

class PlayAgain extends Component {
  playAgain = () => {
    const { history, resetLogin } = this.props;
    history.push('/');
    resetLogin();
  }

  render() {
    return (
      <button
        type="button"
        onClick={ this.playAgain }
        data-testid="btn-play-again"
      >
        Play Again
      </button>
    );
  }
}

PlayAgain.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  resetLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetLogin: () => dispatch(newAction(null, RESET_LOGIN)),
});

export default connect(null, mapDispatchToProps)(PlayAgain);
