import React, { Component } from 'react'

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import {connect} from 'react-redux';
import L from 'leaflet';
import {load, carregarPontosDaCategoria, carregarPontosRelacionados} from './actions';
import { bindActionCreators } from 'redux';
// import MarkerClusterGroup from 'react-leaflet-markercluster';
import Websocket from 'react-websocket';
import {Row,Col} from 'react-bootstrap';
import config from '../../config';
//import pontosRelacionados from './pontos-relacionados';

import '../../css/leaflet.css';
import '../../css/leaflet-popup.css';
import '../../css/leaflet-icon.css';
import '../../../node_modules/leaflet-draw/dist/leaflet.draw.css';

import BuscaGeo from '../buscageo';

class Mapa extends Component {

  constructor(props) {
    super(props);
    this.iconPerson = new L.Icon({
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png',
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(60, 75),
        className: 'leaflet-div-icon'
    });
    this.state = {
      lat: this.props.mapa.lat, 
      lng: this.props.mapa.lng,
      zoom: this.props.mapa.zoom,
    };
  }

  handleData(data) {
    let retorno = JSON.parse(data);
    console.log("websocket news",data);
    retorno.categorias.map((id) =>{
        if(typeof this.props.mapa.groupLayers[id] === 'undefined'){
          return {};
        }
        let categoria = {id:id,icone:this.props.mapa.groupLayers[id].icone};
        return this.props.carregarPontosDaCategoria(categoria);
    });
  }

  iconeCategoria(icone,classe){

      return L.icon({
        iconUrl: icone,
        /*iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow */
        iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
        /*shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor */
        className:classe
      });

  }

  centralizar(ponto){
    let geojson = JSON.parse(ponto.geometryAsGeoJSON);
    
    this.setState( {...this.state,
      lat: geojson.coordinates[1],//-22.123456, 
      lng: geojson.coordinates[0],
      zoom: 13
      })
  }

  atualizarPosicao(viewport) {
    this.setState( {...this.state,
      lat: viewport.center[0],//-22.123456, 
      lng: viewport.center[1],
      zoom: viewport.zoom
      })
  }


  render() {

    const position = [this.state.lat, this.state.lng];
    return (
      <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 mapa-lateral h-100">
        <div className="panel bg-grafite modulo">
            <Websocket url={config.websockets.atualizacaoPontosPorCategoria} 
                       onMessage={this.handleData.bind(this)}/>
            <Map center={position} zoom={this.state.zoom} onViewportChanged={(viewport) => this.atualizarPosicao(viewport)}>
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                url_old="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                id='mapbox.streets'
              />
              
              {this.props.mapa.groupLayers.map((groupLayer) => 
                groupLayer.pontos.map((ponto, idx) => 
                    <Marker key={`marker-${idx}`} 
                            position={[ponto.geometry.coordinates[1],ponto.geometry.coordinates[0]]} 
                            icon={this.iconeCategoria(groupLayer.icone,'ativo')} > 
                      <Popup className="status-popup"  >
                        <div>
                          <span className="descricao">{ponto.descricao} </span>
                          <hr/>
                          <span className="pontos-relacionados" >
                            <div className="acao">
                              <a onClick={(e) =>this.props.carregarPontosRelacionados(ponto)} >Obter pontos relacionados</a>
                            </div>
                            <div id="pontosRelacionados" className="itens">
                              {ponto.pontosRelacionados.map((pontoRelacionado,idx)=>
                                <div key={`ponto-relacionado-${pontoRelacionado.id}`} className="linha">
                                <Row>
                                  <Col xs={1} sm={1} md={1} lg={1} className="coluna">
                                    <img src={`${pontoRelacionado.icone}`} alt="" onClick={(e)=>this.centralizar(pontoRelacionado)}/>
                                  </Col>
                                  <Col xs={7} sm={7} md={7} lg={7} className="coluna">
                                    {pontoRelacionado.descricao}
                                  </Col>
                                  <Col xs={3} sm={4} md={4} lg={4} className="coluna">
                                    {pontoRelacionado.distancia} (mts)
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
              ))}
              
              { /* Marcadores da buscaGeo */
                this.props.buscaGeo.pontos.map((ponto,idx)=>
                <Marker key={`marker-buscageo-${idx}`} 
                              position={[ponto.geometry.coordinates[1],ponto.geometry.coordinates[0]]} 
                              icon={this.iconeCategoria(ponto.icone,'buscaGeo')} > 

                      <Popup className="status-popup">
                        <div>
                          <span className="descricao">{ponto.descricao} </span>
                        </div>
                        
                      </Popup>
                </Marker>
              )}

              <BuscaGeo />
            </Map>
            <div className={this.props.buscaGeo.pontos.length>0?'resultado-buscageo ativo':'resultado-buscageo inativo'} >
                    {this.props.buscaGeo.pontos.map((p,idx)=>
                         <Col xs={12} sm={12} md={4} lg={4} className="ponto" key={`buscageo-` +idx}>
                            <img src={p.icone} alt={p.descricao} onClick={(e)=>this.centralizar(p)}/>
                            <span className="texto"> 
                              {p.descricao}
                            </span>
                        </Col>
                    )}
                </div>
        </div>
        
      </div>
    )
  }
  
}

const mapStateToProps = state => ({mapa: state.mapa, buscaGeo:state.buscaGeo});
const mapDispatchToProps = dispatch => bindActionCreators({load ,carregarPontosDaCategoria, carregarPontosRelacionados}, dispatch); 
export default connect(mapStateToProps, mapDispatchToProps)(Mapa) ;