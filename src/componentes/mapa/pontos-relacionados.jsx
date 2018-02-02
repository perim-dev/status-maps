import React, { Component } from 'react'
//import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {connect} from 'react-redux';
import {carregarPontosRelacionados} from './actions';
import { bindActionCreators } from 'redux';

import {Col} from 'react-bootstrap';

import '../../css/leaflet.css';
import '../../css/leaflet-popup.css';

class PontosRelacionados extends Component {

  constructor(props) {
    super(props);
    console.log('iniciou pontos relacionados');
  }
  
  render() {

    const ponto = this.props.ponto;
    return (
      <span className="pontos-relacionados" >
        <div className="acao">
          <a onClick={(e) =>this.props.carregarPontosRelacionados(ponto)} >Obter pontos relacionados</a>
        </div>
        <div id="pontosRelacionados" className="itens">
          {ponto.pontosRelacionados.map((pontoRelacionado,idx)=>
            <div key={`ponto-relacionado-${pontoRelacionado.id}`}>
              <Col xs={1} sm={1} md={1} lg={1} >
                <img src={`${pontoRelacionado.icone}`} alt="" />
              </Col>
              <Col xs={5} sm={5} md={5} lg={5} >
                {pontoRelacionado.descricao}
              </Col>
              <Col xs={3} sm={3} md={3} lg={3} >
                {pontoRelacionado.distancia}
              </Col>
              <div className="row" ></div>
            </div>

          )}
        </div>
      </span>
    )
  }
}
const mapStateToProps = state => ({mapa: state.mapa});
const mapDispatchToProps = dispatch => bindActionCreators({carregarPontosRelacionados}, dispatch); 
export default connect(mapStateToProps, mapDispatchToProps)(PontosRelacionados) ;