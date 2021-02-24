import React, { Component } from 'react';
import {FeatureGroup} from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {buscarPontos, limparPontos} from './actions';

import '../../css/buscageo.css';

class BuscaGeo extends Component {

    constructor(props) {
        super(props);
        this._editableFG = null;
    }

    limparTudo = () => {
        console.log('Limpando todos os pontos');
        this.limparPontos();
    }

    render(){
        return (
            <div>
                <FeatureGroup ref={ (reactFGref) => {this._onFeatureGroupReady(reactFGref);} }>
                    <EditControl
                        position='topleft'
                        onCreated={(e)=>this.onCreated(e)}
                        onEdited={(e) =>this.onEdited(e)}
                        onDeleted={(e) => this.onDeleted(e)}
                        onMounted={this.onMounted}
                        onEditStart={this.onEditStart}
                        onEditStop={this.onEditStop}
                        onDeleteStart={this.onDeleteStart}
                        onDeleteStop={this.onDeleteStop}
                        draw={{
                            polyline: false,
                            marker: false,
                            circlemarker: false,
                            circle: false
                        }}
                    />
                </FeatureGroup>
                
            </div>
        );
    }

    _onFeatureGroupReady = (reactFGref) => {
        this._editableFG = reactFGref;
    }

    atualizarBuscar(){
        this._editableFG.leafletElement.toGeoJSON().features.map((feature)=>{
            this.props.buscarPontos(feature.geometry);
            return feature;
        });
    }

    onEdited(e){
        this.props.limparPontos();
        this.atualizarBuscar();
    }

    onCreated(e) {
        this.props.limparPontos();
        this.atualizarBuscar();
    }

    onDeleted(e) {
        this.props.limparPontos();
        this.atualizarBuscar();
    }

    onMounted(e) {
        
    }
    
    onEditStart(e) {
        
    }
    
    onEditStop(e) {
        
    }
    
    onDeleteStart(e) {
        
    }
    
    onDeleteStop(e) {
        
    }

}

const mapStateToProps = state => ({buscaGeo: state.buscaGeo});
const mapDispatchToProps = dispatch => bindActionCreators({buscarPontos, limparPontos}, dispatch); 
export default connect(mapStateToProps, mapDispatchToProps)(BuscaGeo) ;