import React from 'react';
import logo from './trivia.png';
import './App.css';
import Login from './pages/login';

export default function App() {
  return (
    <div className="App">
      <Login />
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
    </div>
  );
}
