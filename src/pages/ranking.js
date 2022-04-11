import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import GoHome from '../components/GoHome';

class Ranking extends Component {
  componentDidMount() {
    this.setLocalStorage();
  }

  setLocalStorage() {
    const { playerName, score, email } = this.props;
    const picture = this.gravatarCall(email);
    const playersArray = [];
    const playersKey = { name: playerName, score, picture };
    playersArray.push(playersKey);
    const playersKeyString = JSON.stringify(playersArray);
    if (localStorage.players === undefined) {
      localStorage.setItem('players', playersKeyString);
    } else {
      const localStorageObj = JSON.parse(localStorage.getItem('players'));
      localStorageObj.push(playersKey);
      const ObjToString = JSON.stringify(localStorageObj);
      localStorage.setItem('players', ObjToString);
    }
  }

  gravatarCall(email) {
    const hash = md5(email).toString();
    return (`https://www.gravatar.com/avatar/${hash}`);
  }

  rankingTableRender() {
    const rankingObject = JSON.parse(localStorage.getItem('players'));
    const rankingTable = rankingObject.map((index) => (
      <tr key={ index.name }>
        <td><img src={ index.picture } alt="player avatar" /></td>
        <td>{index.name}</td>
        <td>{index.score}</td>
      </tr>
    ));
    return rankingTable;
  }

  render() {
    const { history } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {this.rankingTableRender()}
          </tbody>
        </table>
        <GoHome history={ history } />
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape(PropTypes.any).isRequired,
  playerName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  email: state.player.email,
  score: state.player.score,
  token: state.token,
});

export default connect(mapStateToProps, null)(Ranking);
