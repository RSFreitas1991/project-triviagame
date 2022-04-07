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
      <div className="header_superior">
        <span>
          <img
            src={ this.gravatarCall(email) }
            alt="Gravatar"
            data-testid="header-profile-picture"
          />
        </span>
        <div>
          <h1>Jogador:</h1>
          <span data-testid="header-player-name">{ playerName }</span>
        </div>
        <div>
          <h1>Placar:</h1>
          <span data-testid="header-score">{ score }</span>
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
