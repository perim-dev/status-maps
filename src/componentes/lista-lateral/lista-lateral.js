import React, { Component } from 'react';
import {Col, Panel} from 'react-bootstrap';
import ArvoreAcervo from './arvore-acervos';

class ListaLateral extends Component {
  render() {
    return (
        <Col xsHidden={true} sm={3} md={3} lg={3} className="modulo h-100">
          <div className="area-titulo">
            <div className="area-titulo box">
              <img src={require('../../img/aguia.png')} alt="logo"/>
              <div className="texto">STATUS</div>
            </div>
          </div>
          <Panel header="Acervos" 
                 className="lista-lateral hidden-sm-up nopadding bg-grafite modulo" >
              <ArvoreAcervo />
          </Panel>
          <br />
        </Col>
    );
  }
}

export default ListaLateral;

