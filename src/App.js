import React, { Component } from 'react';

import BarraDeTitulo from './componentes/barra-de-titulo/barra-de-titulo';
import ListaLateral from './componentes/lista-lateral/lista-lateral';
import Mapa from './componentes/mapa/mapa';
import Rodape from './componentes/rodape/rodape';
import {SidebarDemo} from './componentes/lista-lateral/sidebar';

import {Row} from 'react-bootstrap';

import '../node_modules/font-awesome/css/font-awesome.min.css';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.css';

import './css/tema.css';
import './css/utils.css';

import Rotas from './routes.js';

class App extends Component {

  componentDidMount(){
    console.log("App","montou o objeto");
  }
  render() {
    return (
      <div className="content-fluid h-100">
        <Rotas />
      </div>
    );
  }
}

export default App;
