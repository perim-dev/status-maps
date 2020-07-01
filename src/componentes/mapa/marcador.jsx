import React, { Component } from 'react'
import { Marker, Popup } from 'react-leaflet';

import {Col, Row} from 'react-bootstrap';

import {LatLng} from 'leaflet';

import '../../css/leaflet.css';
import '../../css/leaflet-popup.css';
import '../../css/leaflet-icon.css';

export default class Marcador extends Component {

  constructor(props) {
    super(props);
    this.state = {atualizandoMaisInformacoes:false}
  }

  obterMaisInformacoesDoPonto = async (ponto) => {
    this.setState({atualizandoMaisInformacoes:true});
    await this.props.carregarPontosRelacionados(ponto);
    await this.props.carregarAreaDeAtuacao(ponto);
    this.setState({atualizandoMaisInformacoes:false});
  }

  validateMarkers = (p) =>{
    
    const {map} = this.props;
    if( p.geometry.type !=='Point'){
      return false;
    }
    let latLngFilter = new LatLng(p.geometry.coordinates[1],p.geometry.coordinates[0]);
    
    return map.getBounds().contains(latLngFilter);
  }
  
  render() {

    const {ponto, icone, centralizar} = this.props;
    
    return this.validateMarkers(ponto) && (
      <Marker onclick={(e) => centralizar(ponto, true)}
        position={[ponto.geometry.coordinates[1],ponto.geometry.coordinates[0]]} 
        icon={icone} > 
        <Popup className="status-popup" >
        <div>
          <span className="descricao">{ponto.descricao} </span>
          <hr/>
          <span className="pontos-relacionados" >
            <div className="acao">
              <a onClick={(e) => this.obterMaisInformacoesDoPonto(ponto)} >Obter mais informações</a>
              {this.state.atualizandoMaisInformacoes && <img style={{background:'none',paddingLeft:'5px'}} src={require('../../img/loading.gif')} alt="logo"/>}
            </div>
            <div id="areasDeAtuacao" className="itens">
              {ponto.areasDeAtuacao && ponto.areasDeAtuacao.length > 0 && <div className="titulo-informacoes">Circunscrição</div>}
              {ponto.areasDeAtuacao && ponto.areasDeAtuacao.map((area,idx)=>
                <div key={`area-de-atuacao-key-${idx}`} className="linha">
                <Row>
                  <Col xs={7} sm={7} md={7} lg={7} className="coluna">
                    {area.categoria}
                  </Col>
                  <Col xs={3} sm={4} md={4} lg={4} className="coluna">
                    {area.descricao}
                  </Col>
                  <div className="row" ></div>
                </Row>  
                </div>
              )}
            </div>
            <div id="pontosRelacionados" className="itens">
              {ponto.pontosRelacionados.length > 0 && <div className="titulo-informacoes">Pontos relacionados</div>}
              {ponto.pontosRelacionados.map((pontoRelacionado,idx)=>
                <div key={`ponto-relacionado-${pontoRelacionado.id}`} className="linha">
                <Row>
                  <Col xs={1} sm={1} md={1} lg={1} className="coluna">
                    <img src={`${pontoRelacionado.icone}`} alt="" onClick={(e)=>centralizar(pontoRelacionado)}/>
                  </Col>
                  <Col xs={7} sm={7} md={7} lg={7} className="coluna">
                    {pontoRelacionado.descricao}
                  </Col>
                  <Col xs={3} sm={4} md={4} lg={4} className="coluna">
                    {pontoRelacionado.distancia} (m)
                  </Col>
                  <div className="row" ></div>
                </Row>  
                </div>
              )}
            </div>
          </span>
        </div>

      </Popup>
    </Marker>
    )
  }
}

