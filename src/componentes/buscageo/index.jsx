import React, { Component } from 'react';
import {FeatureGroup} from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"

class BuscaGeo extends Component {
    render(){
        return (
            <FeatureGroup>
                <EditControl
                    position='topright'
                    onCreated={this.onCreated}
                    onEdited={this.onEdited}
                    onDeleted={this.onDeleted}
                    onMounted={this.onMounted}
                    onEditStart={this.onEditStart}
                    onEditStop={this.onEditStop}
                    onDeleteStart={this.onDeleteStart}
                    onDeleteStop={this.onDeleteStop}
                    draw={{
                        polyline: false,
                        marker: false,
                        circlemarker: false
                    }}
                />
            </FeatureGroup>
        );
    }

    onEdited(e){
        console.log("edited",e);
    }

    onCreated(e) {
        console.log("created",e);
    }

    onDeleted(e) {
        console.log("deleted",e);
    }

    onMounted(e) {
        console.log("mounted",e);
    }
    
    onEditStart(e) {
        console.log("edit Start",e);
    }
    
    onEditStop(e) {
        console.log("edit Stop",e);
    }
    
    onDeleteStart(e) {
        console.log("delete Start",e);
    }
    
    onDeleteStop(e) {
        console.log("delete Stop",e);
    }

}



export default BuscaGeo;