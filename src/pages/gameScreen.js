import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';

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
    };

    this.getCorrectAnswer = this.getCorrectAnswer.bind(this);
  }

  getCorrectAnswer(answer, correctAnswer, difficulty) {
    const { updateScore } = this.props;
    // 10 + (timer * dificuldade)
    // hard: 3, medium: 2, easy: 1

    if (answer === correctAnswer) {
      console.log('acertouuuu');
      console.log(baseValue + (1 * difficulties[difficulty]));
      updateScore(baseValue + (1 * difficulties[difficulty]), SAVE_SCORE);
    } else {
      console.log('errooou');
    }

    console.log(answer);
    console.log(correctAnswer);
    console.log(difficulty);
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
          onClick={
            () => this.getCorrectAnswer(answer, answers.correct_answer,
              answers.difficulty)
          }
        >
          { answer }
        </button>
      ))
    );
  }

  // comentário

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

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score, actionType) => dispatch(newAction(score, actionType)),
});

GameScreen.propTypes = {
  questions: PropTypes.instanceOf().isRequired,
  updateScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
