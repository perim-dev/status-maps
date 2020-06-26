import React from 'react';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import '../../css/heatmap.css';
 
class Heatmap extends React.Component {
 
    constructor(props){
        super(props);
        this.pontos = [];
    }

     
    render() {
        var pontos = [];       
        this.props.pontos.map((categoria) => categoria.pontos.map((p)=>{
            if(p.geometry.type ==='Point'){
                pontos.push(p)
            }
            return {};
        }));
        this.pontos = pontos;

        return (
            <HeatmapLayer 
                points={this.pontos}
                longitudeExtractor={p => p.geometry.coordinates[0]}
                latitudeExtractor={p => p.geometry.coordinates[1]}
                intensityExtractor={p => 100} />
        );
    }
}

export default Heatmap;