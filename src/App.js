import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/login';
import GameScreen from './pages/gameScreen';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/gamescreen" component={ GameScreen } />
      </Switch>
      {/* <div className="App"> */}
      {/* <Login /> */}
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
    </div> */}
    </>
  );
}
