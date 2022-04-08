import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  gravatarCall(email) {
    const hash = md5(email).toString();
    return (`https://www.gravatar.com/avatar/${hash}`);
  }

  render() {
    const { email, playerName, score } = this.props;

    return (
      <div className="header-superior">
        <span>
          <img
            src={ this.gravatarCall(email) }
            alt="Gravatar"
            data-testid="header-profile-picture"
          />
        </span>
        <div className="header-player-name">
          <h2 className="header-element">Jogador:</h2>
          <h2 data-testid="header-player-name">{ playerName }</h2>
        </div>
        <div className="header-score">
          <h2 className="header-element">Placar:</h2>
          <h2 data-testid="header-score">{ score }</h2>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.email,
  playerName: state.player.playerName,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Header);
