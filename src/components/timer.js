import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  timer() {
    const miliSeconds = 1000;
    this.intervalID = setInterval(this.removeSeconds, miliSeconds);
  }

  removeSeconds() {
    const { seconds } = this.state;
    const lessSecond = seconds - 1;
    if (seconds !== 0) {
      this.setState({
        seconds: lessSecond,
      });
    } else {
      clearInterval(this.intervalID);
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <p>{seconds}</p>
        <button
          type="button"
          onClick={ this.timer }
        >
          Start
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.main.email,
  playerName: state.main.playerName,
});

export default connect(mapStateToProps, null)(Timer);
