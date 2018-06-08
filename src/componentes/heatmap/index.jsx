import React from 'react';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import '../../css/heatmap.css';
 
class Heatmap extends React.Component {
 
    constructor(props){
        super(props);
        this.pontos = [];
    }

     
    render() {
        console.log("render");
        var pontos = [];       
        this.props.pontos.map((categoria) => categoria.pontos.map((p)=>pontos.push(p)));
      /*
      console.log(this.props.pontos.reduce((r,p) => {
          return r.push(p)
        },pontos));
      */
 
        
        //this.setState({...this.state,pontos:pontos});
        this.pontos = pontos;
        console.log(pontos);
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