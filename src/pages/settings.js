import React from 'react';
import { Link } from 'react-router-dom';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <button type="button">
          <Link to="/">Voltar</Link>
        </button>
      </div>
    );
  }
}

export default Settings;
