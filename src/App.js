import React, { Component } from 'react';

import BarraDeTitulo from './componentes/barra-de-titulo/barra-de-titulo';
import ListaLateral from './componentes/lista-lateral/lista-lateral';
import Mapa from './componentes/mapa/mapa';
import Rodape from './componentes/rodape/rodape';


import {Row} from 'react-bootstrap';

import '../node_modules/font-awesome/css/font-awesome.min.css';

import './css/tema.css';
import './css/utils.css';

class App extends Component {

  componentDidMount(){

  }

  render() {
    return (
      <div className="content-fluid h-100">
        <Row id="layout-barra-titulo">
          <BarraDeTitulo />
        </Row>
        <Row id="layout-corpo">
            <ListaLateral />
            <Mapa />
        </Row>
        <Row id="layout-rodape">
          <Rodape />
        </Row>
      </div>
    );
  }
}

export default App;
