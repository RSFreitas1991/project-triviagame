import React from 'react';
import PropTypes from 'prop-types';

import GoToRanking from '../components/GoToRanking';
import Header from '../components/header';

class Feedback extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <div>
          <Header />
          <p data-testid="feedback-text">
            Text de feedback
          </p>
        </div>
        <GoToRanking history={ history } />
      </>

    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape(PropTypes.any).isRequired,
};

export default Feedback;
