import React, { Component } from 'react';

import '../node_modules/font-awesome/css/font-awesome.min.css';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.css';

import './css/tema.css';
import './css/utils.css';

import Rotas from './routes.js';

class App extends Component {

  render() {
    return (
      <div className="content-fluid h-100">
        <Rotas />
      </div>
    );
  }
}

export default App;
