import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/feedback.css';

class GoToRanking extends Component {
  sendToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <button
        className="goToRanking-button"
        type="button"
        data-testid="btn-ranking"
        onClick={ this.sendToRanking }
      >
        Ranking
      </button>
    );
  }
}

GoToRanking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default GoToRanking;
