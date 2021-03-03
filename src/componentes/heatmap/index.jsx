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

                <div className="heatmap-button">
                    <div className={`heatmap-button-conteudo `+ (this.props.exibir?'ativo':'')} onClick={(e)=>this.props.onClick(e)}>HM</div>              
                    {this.props.exibir && 
                    <HeatmapLayer 
                        points={this.pontos}
                        longitudeExtractor={p => p.geometry.coordinates[0]}
                        latitudeExtractor={p => p.geometry.coordinates[1]}
                        intensityExtractor={p => 100} />
                    }
                </div>
            
        );
    }
}

export default Heatmap;

export const HMButtonMenu = (props) => {
    return (
      <div className="transito-menu-button">
      <div className={`transito-menu-button-conteudo `+ (props.exibir?'ativo':'')} onClick={(e)=>props.onClick(e)} title="Gráfico de trânsito"><i className="fa fa-area-chart"></i></div>
      </div>
    )
  }