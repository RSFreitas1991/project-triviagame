import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';

const MAX = 4;

class GameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };
  }

  shuffleAnswers = (answers) => {
    const quests = [...answers.incorrect_answers, answers.correct_answer];
    const POINT5 = 0.5;
    const shuffle = quests.sort(() => Math.random() - POINT5);

    //  https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

    return (
      shuffle.map((answer, index) => (
        <button
          key={ answer }
          type="button"
          data-testid={
            answer === answers.correct_answer ? 'correct-answer' : `wrong-answer-${index}`
          }
        >
          { answer }
        </button>
      ))
    );
  }

  handleClick = () => {
    this.setState((prev) => ({
      index: prev.index < MAX ? prev.index + 1 : MAX,
    }));
  }

  questionRender() {
    const { questions } = this.props;
    const { index } = this.state;
    return (
      <div>
        <h4
          data-testid="question-category"
        >
          {questions[index].category}
        </h4>
        <h4
          data-testid="question-text"
        >
          {questions[index].question}
        </h4>
        <div data-testid="answer-options">
          {
            this.shuffleAnswers(questions[index])
          }
        </div>
      </div>
    );
  }

  render() {
    const { questions } = this.props;
    return (
      <div>
        <Header />
        <div>
          {
            (
              questions.length > 0
              && (
                <div>
                  {this.questionRender()}
                </div>
              )
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

GameScreen.propTypes = {
  questions: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, null)(GameScreen);
