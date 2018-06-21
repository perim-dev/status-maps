import React, { Component } from 'react';
import { Polygon, Popup} from 'react-leaflet';

import '../../css/alertas.css';

export default class Alarme extends Component {

    constructor(props){
        super(props);
        this.feature = props.feature;
    }

    render(){
        return ( 
        <Polygon positions={this.inverterLatLng(this.feature.geometry.coordinates[0])} color="red" >
            <Popup className="status-popup"  >
                <div>
                    <span className="descricao">{this.feature.properties.descricao }</span>
                    <hr/>
                    <span className="alarmte motivo">
                        {this.feature.properties.motivo}
                    </span>

                </div>
            </Popup>
        </Polygon> );
    }

    inverterLatLng(obj){
        return obj.map((e)=> [e[1],e[0]]);
    }

    estiloCustomizado(feature){
        console.log(feature);
        return {color: "#991111"};
    }

}
