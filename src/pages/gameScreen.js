import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import Timer from '../components/timer';

import { newAction } from '../actions';
import { SAVE_SCORE } from '../reducers/main';

const MAX = 4;
const baseValue = 10;
const difficulties = {
  hard: 3,
  medium: 2,
  easy: 1,
};

class GameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      answerSelected: false,
      correct: '',
      wrong: '',
    };

    this.getCorrectAnswer = this.getCorrectAnswer.bind(this);
    this.executeFunctions = this.executeFunctions.bind(this);
  }

  getCorrectAnswer(answer, correctAnswer, difficulty) {
    const { updateScore } = this.props;

    if (answer === correctAnswer) {
      const timer = document.getElementById('timer').innerHTML;
      updateScore(
        baseValue + (parseInt(timer, 10) * difficulties[difficulty]), SAVE_SCORE,
      );
    }
  }

  shuffleAnswers = (answers) => {
    const { correct, wrong } = this.state;
    const quests = [...answers.incorrect_answers, answers.correct_answer];
    const { isAnswerButtonDisabled } = this.props;
    const POINT5 = 0.5;
    const shuffle = quests.sort(() => Math.random() - POINT5);

    //  https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

    return (
      shuffle.map((answer, index) => (
        <button
          key={ answer }
          type="button"
          disabled={ isAnswerButtonDisabled }
          data-testid={
            answer === answers.correct_answer ? 'correct-answer' : `wrong-answer-${index}`
          }
          className={
            answer === answers.correct_answer ? correct : wrong
          }
          onClick={ () => this.executeFunctions(answer, answers.correct_answer,
            answers.difficulty) }
        >
          { answer }
        </button>
      ))
    );
  }

  selectAnswer = () => {
    this.setState({
      answerSelected: true,
      correct: 'correct-answer',
      wrong: 'wrong-answer',
    });
  }

  handleClick = () => {
    const { history } = this.props;
    const { index } = this.state;
    this.setState((prev) => ({
      index: prev.index < MAX ? prev.index + 1 : MAX,
      correct: '',
      wrong: '',
    }));
    if (index === MAX) {
      history.push('/feedback');
    }
  }

  executeFunctions(answer, correctAnswer, difficulty) {
    this.selectAnswer();
    this.getCorrectAnswer(answer, correctAnswer, difficulty);
  }

  questionRender() {
    const { questions } = this.props;
    const { index, answerSelected } = this.state;
    return (
      <div className="game">
        <h2
          data-testid="question-category"
        >
          {questions[index].category}
        </h2>
        <h2
          data-testid="question-text"
        >
          {questions[index].question}
        </h2>
        <div data-testid="answer-options">
          {
            this.shuffleAnswers(questions[index])
          }
        </div>
        <div>
          {answerSelected && (
            <button
              type="button"
              onClick={ this.handleClick }
              data-testid="btn-next"
              className="next-button"
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }

  render() {
    const { questions } = this.props;
    return (
      <div>
        <Header />
        <div className="game-screen">
          <Timer />
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
  isAnswerButtonDisabled: state.questions.isAnswerButtonDisabled,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score, actionType) => dispatch(newAction(score, actionType)),
});

GameScreen.propTypes = {
  isAnswerButtonDisabled: PropTypes.bool.isRequired,
  questions: PropTypes.instanceOf().isRequired,
  updateScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
