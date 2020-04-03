import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Card from './Components/Card';
import HomePage from './Components/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/card/:id" component={Card} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
