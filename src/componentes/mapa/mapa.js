import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import '../../css/leaflet.css';

export default class Mapa extends Component {

  constructor(props){
    super(props);
    this.state = {lat:-22.9335,lng:-43.3206,zoom:11};
    this.handleUpPanClick = this.handleUpPanClick.bind(this);
  }

  handleUpPanClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panBy([0, -100]);
    window.console.log('Panning up');
  }

  render() {

    const position = [this.state.lat, this.state.lng];
    return (
      <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9 mapa-lateral h-100">
        <div className="panel lista-lateral bg-grafite modulo">
            <Map center={position} zoom={this.state.zoom}>
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                url_old="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                id='mapbox.streets'
              />
              <Marker position={[51.505,-0.09]}>
                <Popup>
                  <span>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </span>
                </Popup>
              </Marker>
            </Map>

        </div>
      </div>
    )
  }
}
