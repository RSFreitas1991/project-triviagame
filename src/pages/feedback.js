import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoToRanking from '../components/GoToRanking';
import Header from '../components/header';
import PlayAgain from '../components/PlayAgain';

class Feedback extends React.Component {
  render() {
    const { history, assertions, score } = this.props;
    const three = 3;
    return (
      <>
        <div>
          <Header />
          {
            assertions < three ? <h2 data-testid="feedback-text">Could be better...</h2>
              : <h2 data-testid="feedback-text">Well Done!</h2>
          }
        </div>
        <div>
          <h3 data-testid="feedback-total-score">{ score }</h3>
          <h3 data-testid="feedback-total-question">{ assertions }</h3>
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
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Feedback);
