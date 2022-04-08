import React from 'react';
import PropTypes from 'prop-types';
import GoToRanking from '../components/GoToRanking';
import Header from '../components/header';
import PlayAgain from '../components/PlayAgain';

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
        <div>
          <GoToRanking history={ history } />
          <PlayAgain history={ history } />
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedback;
