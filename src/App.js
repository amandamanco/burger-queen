import React from 'react';
import Register from './window/Register.js';
import Login from './window/login.js';
import Saloon from './window/Saloon.js';
import Kitchen from './window/Kitchen.js';
import Historic from './window/Historic.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={Login} />
        <Route path="/Register" render={Register} />
        <Route path="/Login" render={Login} />
        <Route path="/Saloon" render={Saloon} />
        <Route path="/Kitchen" render={Kitchen} />
        <Route path="/Historic" render={Historic} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
