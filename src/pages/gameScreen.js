import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import Timer from '../components/timer';
import { newAction } from '../actions';
import { SAVE_SCORE, RESET_TIMER, TIMER_FREEZE } from '../reducers/main';
import { CHANGE_BUTTON_STATE } from '../reducers/questionsReducer';

const MAX = 4;
const baseValue = 10;
const difficulties = {
  hard: 3,
  medium: 2,
  easy: 1,
};
const correct = 'correct-answer';
const wrong = '#wrong-answer';

class GameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      answerSelected: false,
    };
    this.questionsShuffle = 0;
    this.getCorrectAnswer = this.getCorrectAnswer.bind(this);
    this.executeFunctions = this.executeFunctions.bind(this);
  }

  componentDidMount() {
    this.questionsShuffleFunction();
  }

  componentDidUpdate() {
    const { isAnswerButtonDisabled } = this.props;
    if (isAnswerButtonDisabled) {
      this.changeButtomState(true);
    } else {
      this.changeButtomState(false);
    }
  }

  getCorrectAnswer(answer, correctAnswer, difficulty) {
    const { updateScore, score } = this.props;

    if (answer === correctAnswer) {
      const timer = document.getElementById('timer').innerHTML;
      const pointsEarned = baseValue + (parseInt(timer, 10) * difficulties[difficulty]);
      const totalPointsEarned = pointsEarned + score;
      updateScore(totalPointsEarned, SAVE_SCORE);
    }
  }

  shuffleAnswers = (answers) => {
    const quests = [...answers.incorrect_answers, answers.correct_answer];
    const POINT5 = 0.5;
    const shuffle = quests.sort(() => Math.random() - POINT5);

    //  https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    const questions = shuffle.map((answer, index) => (
      <button
        key={ answer }
        type="button"
        data-testid={
          answer === answers.correct_answer ? correct : `wrong-answer-${index}`
        }
        id={
          answer === answers.correct_answer ? correct : 'wrong-answer'
        }
        onClick={ () => this.executeFunctions(answer, answers.correct_answer,
          answers.difficulty) }
      >
        { answer }
      </button>
    ));
    return questions;
  }

  selectAnswer = () => {
    this.setState({
      answerSelected: true,
    });
    const { disableAnswers } = this.props;
    const wrongAnswers = document.querySelectorAll(wrong);
    const correctAnswers = document.getElementById(correct);
    correctAnswers.className = correct;
    for (let index = 0; index < wrongAnswers.length; index += 1) {
      wrongAnswers[index].className = 'wrong-answer';
    }
    disableAnswers(true, CHANGE_BUTTON_STATE);
    disableAnswers(true, TIMER_FREEZE);
  }

  handleClick = () => {
    const { history } = this.props;
    const { index } = this.state;
    this.resetClassAnswers();
    this.setState((prev) => ({
      index: prev.index < MAX ? prev.index + 1 : MAX,
    }));
    this.resetTimerFunction();
    this.questionsShuffleFunction();
    if (index === MAX) {
      history.push('/feedback');
    }
  }

  changeButtomState(state) {
    const wrongAnswers = document.querySelectorAll(wrong);
    const correctAnswers = document.getElementById(correct);
    correctAnswers.disabled = state;
    for (let index = 0; index < wrongAnswers.length; index += 1) {
      wrongAnswers[index].disabled = state;
    }
  }

  resetClassAnswers() {
    const wrongAnswers = document.querySelectorAll('#wrong-answer');
    const correctAnswers = document.getElementById('correct-answer');
    correctAnswers.className = '';
    for (let index = 0; index < wrongAnswers.length; index += 1) {
      wrongAnswers[index].className = '';
    }
  }

  questionsShuffleFunction() {
    const { questions } = this.props;
    const { index } = this.state;
    this.questionsShuffle = this.shuffleAnswers(questions[index]);
  }

  resetTimerFunction() {
    const { updateScore } = this.props;
    updateScore(true, RESET_TIMER);
  }

  executeFunctions(answer, correctAnswer, difficulty) {
    this.selectAnswer();
    this.getCorrectAnswer(answer, correctAnswer, difficulty);
  }

  questionRender() {
    const { questions } = this.props;
    const { index, answerSelected } = this.state;
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
            this.questionsShuffle
          }
        </div>
        <div>
          {answerSelected && (
            <button
              type="button"
              onClick={ this.handleClick }
              data-testid="btn-next"
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
        <h1>Tempo:</h1>
        <Timer />
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
  isAnswerButtonDisabled: state.questions.isAnswerButtonDisabled,
  score: state.player.score,
  resetTimer: state.player.resetTimer,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score, actionType) => dispatch(newAction(score, actionType)),
  disableAnswers: (state, type) => dispatch(newAction(
    state, type,
  )),
});

GameScreen.propTypes = {
  updateScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  questions: PropTypes.instanceOf(Array).isRequired,
  isAnswerButtonDisabled: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  disableAnswers: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
