import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import Personal from './components/personal';
// import logo from './logo.svg';
// import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/personal">
            <Personal />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
