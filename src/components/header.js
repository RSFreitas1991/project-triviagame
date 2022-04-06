import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      points: 0,
    };
  }

  gravatarCall(email) {
    const hash = md5(email).toString();
    return (`https://www.gravatar.com/avatar/${hash}`);
  }

  render() {
    const { email, playerName } = this.props;
    const { points } = this.state;
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
          <span data-testid="header-score">{ points }</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.main.email,
  playerName: state.main.playerName,
});

export default connect(mapStateToProps, null)(Header);
