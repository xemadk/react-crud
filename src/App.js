import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import CarList from './CarList'
import CarCreate from './CarCreate'
import CarUpdate from './CarUpdate'


function App() {
  return (
    <>
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">CAR Manager</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
              </ul>
            </div>
          </nav> <br />
          <Switch>
            <Route path='/create' component={CarCreate} />
            <Route path='/update/:id' component={CarUpdate} />
            <Route path='/' component={CarList} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
