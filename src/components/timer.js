import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newAction } from '../actions';
import { CHANGE_BUTTON_STATE } from '../reducers/questionsReducer';
import { RESET_TIMER } from '../reducers/main';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.intervalID = 0;
    this.removeSeconds = this.removeSeconds.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    this.resetTimerFunction();
  }

  resetTimerFunction() {
    const { resetTimer, isAnswerButtonDisabled } = this.props;
    if (resetTimer) {
      clearInterval(this.intervalID);
      isAnswerButtonDisabled(false, RESET_TIMER);
      this.setState({
        seconds: 30,
      });
      this.timer();
    }
  }

  timer() {
    const miliSeconds = 1000;
    this.intervalID = setInterval(this.removeSeconds, miliSeconds);
  }

  removeSeconds() {
    const { seconds } = this.state;
    const { isAnswerButtonDisabled } = this.props;
    const lessSecond = seconds - 1;
    if (seconds !== 0) {
      this.setState({
        seconds: lessSecond,
      });
    } else {
      clearInterval(this.intervalID);
      isAnswerButtonDisabled(true, CHANGE_BUTTON_STATE);
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <p id="timer">{seconds}</p>
      </div>
    );
  }
}

Timer.propTypes = {
  isAnswerButtonDisabled: PropTypes.func.isRequired,
  resetTimer: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  resetTimer: state.player.resetTimer,
});

const mapDispatchToProps = (dispatch) => ({
  isAnswerButtonDisabled: (state, type) => dispatch(newAction(
    state, type,
  )),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
