import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/login';
import GameScreen from './pages/gameScreen';
import Settings from './pages/settings';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/gamescreen" component={ GameScreen } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
