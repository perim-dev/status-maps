import React, { Component } from 'react'

import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';

import {connect} from 'react-redux';
import L, {LatLng} from 'leaflet';
import {load, carregarPontosDaCategoria, carregarPontosRelacionados} from './actions';
import { bindActionCreators } from 'redux';

import MarkerClusterGroup from "react-leaflet-markercluster";

import Websocket from 'react-websocket';
import {Row,Col} from 'react-bootstrap';
import config from '../../config';
//import pontosRelacionados from './pontos-relacionados';

import '../../css/leaflet.css';
import '../../css/leaflet-popup.css';
import '../../css/leaflet-icon.css';
import '../../css/letreiro-botao-menu.css';
import '../../../node_modules/leaflet-draw/dist/leaflet.draw.css';
import '../../css/marker-cluster-group.css';

/* BuscaGeo */
import BuscaGeo from '../buscageo';
import Listagem from '../buscageo/listagem';

/* Heatmap */
import Heatmap from '../heatmap';

/* Alarme */
import { buscarAlarmesDisparados, limparAlarmes } from '../alarme/actions';
import Alarme from '../alarme';

/* Gráfico de trânsito */
import GraficoTransito from '../grafico-transito';
import '../../css/transito.css';

/* Letreiro */
import Letreiro from '../letreiro';

/* Utils */
import {notify} from '../../utils';

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
      exibirHeatmap: false,
      exibirAlertas: true,
      exibirGraficoTransito: true,
      exibirLetreiro: true,
      data : [],
      letreiroInfo:{},
    };
    this.props.buscarAlarmesDisparados();
    this.mapRef = null;
    
    // for(let x=0;x<1000;x++){
    //   let lat = Math.floor(Math.random() * 8999 + 1000);
    //   let lng = Math.floor(Math.random() * 8999 + 1000);
    //   console.log(`INSERT INTO public.pontodeinteresse(descricao, geometry, version, categoria_id) VALUES ('carro 05 ${x}', ST_GeomFromText('POINT(-43.${lat} -22.${lng})',4326), 0, 52);`);
    // }
  }

  handleData(data) {
    let retorno = JSON.parse(data);

    if( retorno.atualizarAlarmes ){
      this.props.limparAlarmes();
      this.props.buscarAlarmesDisparados();
    }
    if( retorno.categorias ) {
      retorno.categorias.map((id) =>{
        if(typeof this.props.mapa.groupLayers[id] === 'undefined'){
          return {};
        }
        let categoria = {id:id,icone:this.props.mapa.groupLayers[id].icone};
        return this.props.carregarPontosDaCategoria(categoria);
      });
    }

    if(retorno.aviso) {
      let intervalo = 0;
      retorno.aviso.map((a) => {
        setTimeout(()=>{
          notify(a.titulo,a.mensagem);
        },intervalo * 5000);
        intervalo++;
        return {};
      });
    }
    
  }

  updateLetreiroInfo = (data) => {
    this.setState({letreiroInfo:data});
//    notify("Mudança de Estágio - " + this.state.letreiroInfo.estagio,this.state.letreiroInfo.mensagem);
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
      });
  }

  alternarTamanhoMapa() {
    this.atualizarPosicao(this.state.viewport);
    this.props.alternarTamanhoMapa();
  }

  alternarHeatmapPontos(){
    this.setState({...this.state,exibirHeatmap:!this.state.exibirHeatmap});
  }

  alternarAlertas(){
    this.setState({...this.state,exibirAlertas:!this.state.exibirAlertas});
    if(this.state.exibirAlertas){
      this.props.buscarAlarmesDisparados();
    }
  }
  
  alternarGraficoTransito = () => {
    this.setState({exibirGraficoTransito:!this.state.exibirGraficoTransito});
  }

  alternarLetreiro = () => {
    this.setState({exibirLetreiro:!this.state.exibirLetreiro});
  }

  gerarPontoNoMapa = (groupLayer, ponto, idx) => {
    if(!this.validateMarkers(ponto)){
      return ;
    }

    return (<Marker key={`marker-${idx}`} 
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
            </Marker>)
  }

  validateMarkers = (p) =>{
    
    const map = this.mapRef.leafletElement;
    if( p.geometry.type !=='Point'){
      return false;
    }
    let latLngFilter = new LatLng(p.geometry.coordinates[1],p.geometry.coordinates[0]);
    
    return map.getBounds().contains(latLngFilter);
  }

  render() {

    const position = [this.state.lat, this.state.lng];
    const {maximizar = false, alternarTamanhoMapa} = this.props;
    const {letreiroInfo} = this.state;

    return (
      <div className={`col-xs-12 col-sm-12 ${maximizar?'col-md-12 col-lg-12':'col-md-9 col-lg-9'} mapa-lateral h-100`}>
        <div className="panel bg-grafite modulo">
          <span className="borda-interativa-mapa" style={{borderColor:letreiroInfo.estagio==='Normalidade'?'rgba(51, 51, 51, 0.8)':letreiroInfo.cor}}>
            {this.state.exibirGraficoTransito && (<GraficoTransito/>)}
            <div style={{display:this.state.exibirLetreiro?'':'none'}}>
              <Letreiro updateLetreiroInfo={this.updateLetreiroInfo} />
            </div>

            <div className="letreiro-button" style={{ borderColor:letreiroInfo.offline?'red':'', borderStyle:letreiroInfo.offline?'Dashed':''}}>
              <div className={`letreiro-button-conteudo`} 
                style={{backgroundColor:letreiroInfo.cor, cursor:letreiroInfo.offline?'not-allowed ':'pointer', color:letreiroInfo.offline?'rgba(255,0,0,0,3)':''}} 
                onClick={(e)=>this.alternarLetreiro()} 
                title="Estágio"> 
                  <img width="100%" src={require('../../img/icone-cidade-rj.png')} alt="logo"/> </div>
            </div>

            <div className="heatmap-button">
              <div className={`heatmap-button-conteudo `+ (this.state.exibirHeatmap?'ativo':'')} onClick={(e)=>this.alternarHeatmapPontos()}>HM</div>              
            </div>

            <div className="alertas-button">
              <div className={`alertas-button-conteudo `+ (this.state.exibirAlertas?'ativo':'')} onClick={(e)=>this.alternarAlertas()} title="Alarmes"><i className="fa fa-bullhorn"></i></div>
            </div>

            <div className="transito-menu-button">
              <div className={`transito-menu-button-conteudo `+ (this.state.exibirGraficoTransito?'ativo':'')} onClick={(e)=>this.alternarGraficoTransito()} title="Gráfico de trânsito"><i className="fa fa-area-chart"></i></div>
            </div>

            <Websocket 
              url={config.websockets.atualizacaoPontosPorCategoria} 
              onMessage={this.handleData.bind(this)}
            />

            <Map ref={(mapRef) => this.mapRef = mapRef } preferCanvas={false} center={position} zoom={this.state.zoom} onViewportChanged={(viewport) => this.atualizarPosicao(viewport)} >
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                url_old="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                id='mapbox.streets'
              />
              {this.state.exibirHeatmap && <Heatmap pontos={this.props.mapa.groupLayers} />}

              {this.state.exibirAlertas && 
               this.props.alarme.geoJSON.features && 
               this.props.alarme.geoJSON.features.map((f,idx)=>{
                  return <Alarme key={`alarme-${f.properties.id}`} feature={f} />
               })}

              {!this.state.exibirHeatmap && this.props.mapa.groupLayers.map((groupLayer) => 
                // exibir os pontos
                (<MarkerClusterGroup removeOutsideVisibleBounds={true}
                  key={`markerClusterkey-${groupLayer.id}`}
                  iconCreateFunction={
                    function (cluster) {
                        var markers = cluster.getAllChildMarkers();
                        var html = '<div class="agrupamento"><div class="imagem" style=\'background-image: url("'+groupLayer.icone+'")\'></div><div class="texto">' + markers.length + '</div></div>';
                        return L.divIcon({ html: html, className: 'mycluster', iconSize: L.point(32, 32) });
                    }
                  }
                >
                  {groupLayer.pontos.map((ponto, idx) => ponto.geometry.type ==='Point' &&  this.gerarPontoNoMapa(groupLayer, ponto, idx))}
                </MarkerClusterGroup>))}

              {this.props.mapa.groupLayers.map((groupLayer) => 
                // Exibir polígonos
                 groupLayer.pontos.map((ponto, idx) => 
                    ((ponto.geometry.type ==='MultiPolygon'|| ponto.geometry.type ==='Polygon') &&  
                    <Polygon positions={ponto.geometry.coordinates[0]} color={ponto.cor} >
                      <Popup className="status-popup">
                          <div>
                              <span className="descricao">{ponto.descricao }</span>
                              <hr/>
                          </div>
                      </Popup>
                    </Polygon>) 
              ))}
              
              { /* Marcadores da buscaGeo */
                this.props.buscaGeo.acervos.map((acervo,idAcervo)=> 
                  acervo.pontos.map((ponto,idx) =>
                    acervo.visivel && ponto.geometry.type === 'Point' &&
                    <Marker key={`marker-buscageo-${idx}`} 
                                  position={[ponto.geometry.coordinates[1],ponto.geometry.coordinates[0]]} 
                                  icon={this.iconeCategoria(ponto.icone,'buscaGeo')} > 
                          <Popup className="status-popup">
                            <div>
                              <span className="descricao">{ponto.descricao} </span>
                            </div>
                          </Popup>
                    </Marker>
                )
              )}

              <BuscaGeo />
            </Map>
            <Listagem centralizar={this.centralizar.bind(this)}/>
            <div className="utilitario-rodape-mapa">
              <div className='botao-expandir-mapa' onClick={(e)=>alternarTamanhoMapa()} title={`${this.props.maximizar?'Reduzir mapa':'Expandir mapa'}`}><i className={`fa fa-${this.props.maximizar?'chevron-right':'chevron-left'}`}></i></div>
            </div>            
          </span>
        </div>
      </div>
    )
  }
  
}

const mapStateToProps = state => ({mapa: state.mapa, buscaGeo:state.buscaGeo, alarme:state.alarmes});
const mapDispatchToProps = dispatch => bindActionCreators({load ,carregarPontosDaCategoria, carregarPontosRelacionados, buscarAlarmesDisparados, limparAlarmes}, dispatch); 
export default connect(mapStateToProps, mapDispatchToProps)(Mapa) ;