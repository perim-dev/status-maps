import React, { Component } from 'react';

import ListaLateral from './componentes/lista-lateral/lista-lateral';
import Mapa from './componentes/mapa/mapa';
import Rodape from './componentes/rodape/rodape';
import {SidebarDemo} from './componentes/lista-lateral/sidebar';

import {Row} from 'react-bootstrap';

import io from "socket.io-client";

import '../node_modules/font-awesome/css/font-awesome.min.css';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.css';

import './css/tema.css';
import './css/utils.css';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {mapaExpandido:true};
    setTimeout(()=>{
      // Para corrigir o problema de renderização do mapa
      this.setState({mapaExpandido:false})
    },500);
  }

  alternarTamanhoMapa = () => {
    this.setState({mapaExpandido:!this.state.mapaExpandido});
  }
  

  render() {
    const {mapaExpandido} = this.state;
    const controleRemotoSocket = null;
    // const controleRemotoSocket = io.connect("http://www.bjlima.com.br:8001", {
    //   transports: ['websocket']
    // });
    
    return (
      <div className="h-100">
        <Row id="layout-corpo" className="safari-fix">
            <SidebarDemo exibir={mapaExpandido}/>
            <ListaLateral ocultar={mapaExpandido} controleRemotoSocket={controleRemotoSocket}/>
            <Mapa maximizar={mapaExpandido} alternarTamanhoMapa={this.alternarTamanhoMapa} controleRemotoSocket={controleRemotoSocket}/>
        </Row>
        <Row id="layout-rodape">
          <Rodape />
        </Row>
      </div>
    );
  }
}

export default Main;
