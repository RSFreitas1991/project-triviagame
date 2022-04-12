import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import GoHome from '../components/GoHome';

import '../css/ranking.css';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      isTableReady: false,
    };
    this.rankingTableRender = this.rankingTableRender.bind(this);
  }

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
    if (JSON.parse(localStorage.getItem('players')).length !== 1) {
      this.sortingScore();
    } else {
      this.setState({
        isTableReady: true,
      });
    }
  }

  gravatarCall(email) {
    const hash = md5(email).toString();
    return (`https://www.gravatar.com/avatar/${hash}`);
  }

  sortingScore() {
    const object = JSON.parse(localStorage.getItem('players'));
    let n = 0;
    while (n < object.length ** 2) {
      for (let i = 0; i < object.length - 1; i += 1) {
        if (object[i].score < object[i + 1].score) {
          const pos1 = object[i];
          const pos2 = object[i + 1];
          object[i] = pos2;
          object[i + 1] = pos1;
        } else n += 1;
      }
    }
    const ObjToString = JSON.stringify(object);
    localStorage.setItem('players', ObjToString);
    this.setState({
      isTableReady: true,
    });
  }

  rankingTableRender() {
    const rankingObject = JSON.parse(localStorage.getItem('players'));
    if (rankingObject === null) {
      return <p>Nenhum jogador</p>;
    }
    const rankingTable = rankingObject.map((index, posicao) => (
      <tr key={ index.name }>
        <th scope="row">{ posicao }</th>
        <td><img src={ index.picture } alt="player avatar" /></td>
        <td data-testid={ `player-name-${rankingObject.indexOf(index)}` }>
          {index.name}
        </td>
        <td data-testid={ `player-score-${rankingObject.indexOf(index)}` }>
          {index.score}
        </td>
      </tr>
    ));
    return rankingTable;
  }

  render() {
    const { history } = this.props;
    const { isTableReady } = this.state;
    return (
      <>
        <header className="ranking-header">
          <div className="ranking-content">
            <h1 data-testid="ranking-title">
              Ranking
            </h1>
            <GoHome history={ history } />
          </div>
        </header>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Avatar</th>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {isTableReady && (this.rankingTableRender())}

          </tbody>
        </table>
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
