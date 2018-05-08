import React, { Component } from 'react';
import {FeatureGroup} from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"

class BuscaGeo extends Component {
    render(){
        return (
            <FeatureGroup>
                <EditControl
                  position='topright'
                  draw={{
                    polyline: false,
                    marker: false,
                    circlemarker: false
                  }}
                />
            </FeatureGroup>
        );
    }
}


export default BuscaGeo;