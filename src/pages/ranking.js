import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoHome from '../components/GoHome';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <GoHome history={ history } />
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape(PropTypes.any).isRequired,
};

export default Ranking;
