import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet';
import {connect} from 'react-redux';
import {load, carregarCategoria} from './actions';
import { bindActionCreators } from 'redux';


import '../../css/leaflet.css';

class Mapa extends Component {


  /* handleUpPanClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panBy([0, -100]);
    window.console.log('Panning up');

  }*/

  render() {

    const position = [this.props.mapa.lat, this.props.mapa.lng];
    return (
      <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9 mapa-lateral h-100">
        <div className="panel lista-lateral bg-grafite modulo">
            <Map center={position} zoom={this.props.mapa.zoom} onclick={this.adicionarPontosDaCategoria}>
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                url_old="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                id='mapbox.streets'
              />
              
              {this.props.mapa.groupLayers.map((groupLayer) => 
                groupLayer.map(function (ponto, idx) {
                    let icon = Leaflet.icon({ iconUrl: 'http://icons.iconarchive.com/icons/aha-soft/desktop-halloween/32/Mask-icon.png', iconAnchor:   [16, 16]});
                    return (
                    <Marker key={`marker-${idx}`} position={[ponto.geometry.coordinates[1],ponto.geometry.coordinates[0]]} icon={icon} > 
                      <Popup>
                        <span>{ponto.descricao}</span>
                      </Popup>
                    </Marker>
                    );
                }
                
              ))}

            </Map>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({mapa: state.mapa});
const mapDispatchToProps = dispatch => bindActionCreators({load ,carregarCategoria}, dispatch); 
export default connect(mapStateToProps, mapDispatchToProps)(Mapa) ;