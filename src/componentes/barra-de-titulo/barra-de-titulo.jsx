import React, { Component } from 'react';
import {Col, Panel} from 'react-bootstrap';

import LinhaMarquee from './linha-marquee'

import '../../css/barra-titulo.css';

class BarraDeTitulo extends Component {
  render() {
    return (
      <Col xsHidden={true} sm={12} md={12} lg={12} className="modulo">
        <Panel className="modulo barra-de-titulo bg-grafite ">
            <Col xs={9} sm={1} md={1} lg={1} className="logo">
              <div className="globo"> 
                <i className="fa fa-globe fa-5x"></i>
              </div>
              <div className="engrenagem">
                <i className="fa fa-cog fa-2x"></i>
              </div>
            </Col>

            <Col xsHidden={true} sm={11} md={11} lg={11} id="linha-marquee">
              <LinhaMarquee texto="Empresa Municipal de Informática" cor="verde" />
              <LinhaMarquee texto="Sistema Status" cor="amarelo" />
              <LinhaMarquee texto="Previsão de ressaca hoje no Rio de Janeiro" cor="vermelho" />
            </Col>
        </Panel>
      </Col>

    );
  }
}

export default BarraDeTitulo;
