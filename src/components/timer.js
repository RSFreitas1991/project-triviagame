import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newAction } from '../actions';
import { CHANGE_BUTTON_STATE } from '../reducers/questionsReducer';
import { RESET_TIMER, TIMER_FREEZE } from '../reducers/main';

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
    const { resetTimer, isAnswerButtonDisabled, TimerFreeze } = this.props;
    if (resetTimer) {
      clearInterval(this.intervalID);
      isAnswerButtonDisabled(false, RESET_TIMER);
      isAnswerButtonDisabled(false, CHANGE_BUTTON_STATE);
      this.setState({
        seconds: 30,
      });
      this.timer();
    }
    if (TimerFreeze) {
      const timer = document.getElementById('timer').innerHTML;
      console.log('Entrei no freeze');
      clearInterval(this.intervalID);
      document.getElementById('timer').innerHTML = timer;
      isAnswerButtonDisabled(false, TIMER_FREEZE);
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
        <h1 className="timer" id="timer">{seconds}</h1>
      </div>
    );
  }
}

Timer.propTypes = {
  isAnswerButtonDisabled: PropTypes.func.isRequired,
  resetTimer: PropTypes.bool.isRequired,
  TimerFreeze: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  resetTimer: state.player.resetTimer,
  TimerFreeze: state.player.timerFreeze,
});

const mapDispatchToProps = (dispatch) => ({
  isAnswerButtonDisabled: (state, type) => dispatch(newAction(
    state, type,
  )),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
