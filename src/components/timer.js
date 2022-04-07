import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newAction } from '../actions';
import { CHANGE_BUTTON_STATE } from '../reducers/questionsReducer';

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
        <p>{seconds}</p>
      </div>
    );
  }
}

Timer.propTypes = {
  isAnswerButtonDisabled: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  isAnswerButtonDisabled: (state, type) => dispatch(newAction(
    state, type,
  )),
});

const mapStateToProps = (state) => ({
  email: state.main.email,
  playerName: state.main.playerName,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
