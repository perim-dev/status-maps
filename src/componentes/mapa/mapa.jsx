import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {connect} from 'react-redux';
import L from 'leaflet';
import {load, carregarPontosDaCategoria} from './actions';
import { bindActionCreators } from 'redux';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Websocket from 'react-websocket';
import config from '../../config';

import '../../css/leaflet.css';

class Mapa extends Component {

  handleData(data) {
    let retorno = JSON.parse(data);
    console.log("websocket news",data);
    retorno.categorias.map((id) =>{
        if(typeof this.props.mapa.groupLayers[id] === 'undefined'){
          return {};
        }
        let categoria = {id:id,icone:this.props.mapa.groupLayers[id].icone};
        console.log("websocket load",categoria);
        return this.props.carregarPontosDaCategoria(categoria);
    });
  }

  iconeCategoria(icone){

      return L.icon({
        iconUrl: icone,
        /*iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow */
        iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
        /*shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor */
      });

  }

  render() {

    const position = [this.props.mapa.lat, this.props.mapa.lng];
    return (
      <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9 mapa-lateral h-100">
        <div className="panel lista-lateral bg-grafite modulo">
            
            <Websocket url={config.websockets.atualizacaoPontosPorCategoria} onMessage={this.handleData.bind(this)}/>

            <Map center={position} zoom={this.props.mapa.zoom}>
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                url_old="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                id='mapbox.streets'
              />
              
              {this.props.mapa.groupLayers.map((groupLayer) => 
                groupLayer.pontos.map((ponto, idx) => 
                  <MarkerClusterGroup>
                    <Marker key={`marker-${idx}`} position={[ponto.geometry.coordinates[1],ponto.geometry.coordinates[0]]} icon={this.iconeCategoria(groupLayer.icone)} > 
                      <Popup>
                        <span>{ponto.descricao} </span>
                      </Popup>
                    </Marker>
                  </MarkerClusterGroup>
              ))}

            </Map>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({mapa: state.mapa});
const mapDispatchToProps = dispatch => bindActionCreators({load ,carregarPontosDaCategoria}, dispatch); 
export default connect(mapStateToProps, mapDispatchToProps)(Mapa) ;