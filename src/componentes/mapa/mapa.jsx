import React, { Component } from 'react'

import { Map, TileLayer, Marker, Popup, Polygon, LayersControl } from 'react-leaflet';

import {connect} from 'react-redux';
import L from 'leaflet';
import {load, carregarPontosDaCategoria, carregarPontosRelacionados, carregarAreaDeAtuacao, carregarCamerasProximas} from './actions';
import { bindActionCreators } from 'redux';

import MarkerClusterGroup from "react-leaflet-markercluster";

import Websocket from 'react-websocket';
import config from '../../config';
//import pontosRelacionados from './pontos-relacionados';

import '../../css/leaflet.css';
import '../../css/leaflet-popup.css';
import '../../css/leaflet-icon.css';
import '../../css/letreiro-botao-menu.css';
import '../../../node_modules/leaflet-draw/dist/leaflet.draw.css';
import '../../css/marker-cluster-group.css';

/* Marcador */
import Marcador from './marcador';

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

/* Avisos */
import Avisos from '../avisos';
import '../../css/avisos.css';
import GerenciadorDeAvisos from '../../utils/GerenciadorDeAvisos';

import AvisoComando from '../avisoComando';

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
      exibirAvisos: false,
      exibirBuscaGeo: true,
      novoAviso: false,
      data : [],
      letreiroInfo:{},
      avisoComando: {show:false, left:0, top:0, latlng: {lat:0,lng:0}},
    };
    this.props.buscarAlarmesDisparados();
    this.mapRef = null;
    this.avisosRef = null;
    this.buscaGeoRef = null;

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
      
      this.setState({novoAviso: true});
      let tempoPiscando = this.state.exibirAvisos? 60000:config.TEMPO_AVISO_MINUTOS*60*1000;
      
      clearTimeout(this.timerPiscandoAviso);
      this.timerPiscandoAviso = setTimeout(()=>{
        this.setState({novoAviso: false});
      },tempoPiscando);


      retorno.aviso.map((a) => {

        GerenciadorDeAvisos.adicionar(a);

        setTimeout(()=>{
          notify(a.titulo,a.mensagem);
        },intervalo * 5000);
        intervalo++;
        return {};
      });

      if(this.state.exibirAvisos) {
        this.avisosRef.atualizaDados();
      }

    }
    
  }

  updateLetreiroInfo = (data) => {
    this.setState({letreiroInfo:data});
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

  centralizar = (ponto, semzoom=false) => {

    this.mapRef.leafletElement.invalidateSize();
    let geojson = ponto.geometry || ponto.geometryAsGeoJSON ;//JSON.parse(ponto.geometryAsGeoJSON);
    if(!semzoom) {
      this.setState( {...this.state,
        lat: geojson.coordinates[1],//-22.123456, 
        lng: geojson.coordinates[0],
        zoom: 13
      });
    } else {
      this.setState( {...this.state,
        lat: geojson.coordinates[1],
        lng: geojson.coordinates[0],        
      });
    }
      
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

  exibirAvisos = () => {
     this.setState({novoAviso: false, exibirAvisos: !this.state.exibirAvisos });
  }
 
  limparBuscaGeo = () => {
    this.buscaGeoRef.selector.props.limparPontos();
    this.setState({exibirBuscaGeo:false},() => this.setState({exibirBuscaGeo:true}));
    
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

            {this.state.exibirAvisos && (<Avisos ref={(avisosRef) => this.avisosRef = avisosRef } onRemove={()=> this.setState({novoAviso:false})} />)}

            <div className="heatmap-button">
              <div className={`heatmap-button-conteudo `+ (this.state.exibirHeatmap?'ativo':'')} onClick={(e)=>this.alternarHeatmapPontos()}>HM</div>              
            </div>

            <div className="alertas-button">
              <div className={`alertas-button-conteudo `+ (this.state.exibirAlertas?'ativo':'')} onClick={(e)=>this.alternarAlertas()} title="Alarmes"><i className="fa fa-bullhorn"></i></div>
            </div>

            <div className="transito-menu-button">
              <div className={`transito-menu-button-conteudo `+ (this.state.exibirGraficoTransito?'ativo':'')} onClick={(e)=>this.alternarGraficoTransito()} title="Gráfico de trânsito"><i className="fa fa-area-chart"></i></div>
            </div>

            <div className="avisos-menu-button">
              <div className={`avisos-menu-button-conteudo `+ (this.state.novoAviso?'ativo':'')} onClick={(e)=>this.exibirAvisos()} title="Avisos"><i className="fa fa-bell"></i></div>
            </div>

            {this.state.avisoComando.show && 
              <AvisoComando fechar={(e) => this.setState({avisoComando:{show:false}})} 
                left={this.state.avisoComando.left-5}  
                top={this.state.avisoComando.top-5} 
                lat={this.state.avisoComando.latlng.lat}
                lng={this.state.avisoComando.latlng.lng}
              />
            }

            <Websocket 
              debug={true}
              onOpen={() => console.log('Abriu o socket')}
              onclose={() => console.log('Fechou o socket')}
              url={config.websockets.atualizacaoPontosPorCategoria} 
              onMessage={this.handleData.bind(this)}
            />

            <Map ref={(mapRef) => this.mapRef = mapRef } 
                preferCanvas={false} 
                center={position} 
                zoom={this.state.zoom} 
                onViewportChanged={(viewport) => this.atualizarPosicao(viewport)} 
                onzoomstart={(e) => this.setState({avisoComando: {show:false}}) }
                onmovestart={(e) => this.setState({avisoComando: {show:false}}) }
                onresize={(e) => this.setState({avisoComando: {show:false}}) }
                oncontextmenu={(e)=> {
                  this.setState({avisoComando: {show:false}});
                  this.setState({avisoComando: {show:true, left: e.originalEvent.clientX, top: e.originalEvent.clientY, latlng: e.latlng}})
                }}
            >

              {this.state.exibirHeatmap && <Heatmap pontos={this.props.mapa.groupLayers} />}

              {this.state.exibirAlertas && 
               this.props.alarme.geoJSON.features && 
               this.props.alarme.geoJSON.features.map((f,idx)=>{
                  return <Alarme key={`alarme-${f.properties.id}`} feature={f} />
               })}

              {!this.state.exibirHeatmap && this.props.mapa.groupLayers.map((groupLayer) => 
                // exibir os pontos
                groupLayer.pontos.length > 0 &&
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
                  {groupLayer.pontos.map((ponto, idx) => ponto.geometry.type ==='Point' &&  
                    <Marcador icone={this.iconeCategoria(groupLayer.icone,'ativo')}
                      carregarAreaDeAtuacao={this.props.carregarAreaDeAtuacao}
                      carregarPontosRelacionados={this.props.carregarPontosRelacionados}
                      carregarCamerasProximas={this.props.carregarCamerasProximas}
                      ponto={ponto}
                      key={`marcador-key-${idx}`}
                      centralizar={this.centralizar}
                      map={this.mapRef.leafletElement} />
        
                  
                  )}
                </MarkerClusterGroup>))}

              {this.props.mapa.groupLayers.map((groupLayer) => 
                // Exibir polígonos
                 groupLayer.pontos.map((ponto, idx) => 
                    ((ponto.geometry.type ==='MultiPolygon'|| ponto.geometry.type ==='Polygon') &&  
                    <Polygon positions={ponto.geometry.coordinates[0]} color={ponto.cor} style={{"stroke-width":"0","fill-opacity":0.1}} >
                      <Popup className="status-popup" autoPan={false}>
                          <div>
                              <span className="descricao">{ponto.descricao }</span>
                              <hr/>
                              <span className="link-exibir-pontos-poligono" 
                                onClick={(e) =>{
                                  let geometry = {type: ponto.geometry.type, coordinates:[[]]};
                                  geometry.coordinates[0] = ponto.geometry.coordinates[0].map( c => [c[1], c[0]] );
                                  this.buscaGeoRef.selector.props.buscarPontos(geometry);
                                }}>
                                Exibir pontos no polígono
                              </span>
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

              {this.state.exibirBuscaGeo && <BuscaGeo ref={(buscaGeoRef) => this.buscaGeoRef = buscaGeoRef}  />}

              <LayersControl position="bottomright">
                <LayersControl.BaseLayer checked name="Mapa">
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Satélite">
                  <TileLayer
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  />
                </LayersControl.BaseLayer>
              </LayersControl>

            </Map>
            <Listagem limpar={() => this.limparBuscaGeo()} centralizar={this.centralizar.bind(this)}/>
            <div className="utilitario-rodape-mapa">
              <div className='botao-expandir-mapa' 
                onClick={(e)=>{ 
                  alternarTamanhoMapa();
                  this.setState({avisoComando: {show:false}});
                }} 
                title={`${this.props.maximizar?'Reduzir mapa':'Expandir mapa'}`}>
                  <i className={`fa fa-${this.props.maximizar?'chevron-right':'chevron-left'}`}></i>
              </div>
            </div>            
          </span>
        </div>
      </div>
    )
  }
  
}

const mapStateToProps = state => ({mapa: state.mapa, buscaGeo:state.buscaGeo, alarme:state.alarmes});
const mapDispatchToProps = dispatch => bindActionCreators({load ,carregarPontosDaCategoria, carregarPontosRelacionados, buscarAlarmesDisparados, limparAlarmes, carregarAreaDeAtuacao, carregarCamerasProximas}, dispatch); 
export default connect(mapStateToProps, mapDispatchToProps)(Mapa) ;