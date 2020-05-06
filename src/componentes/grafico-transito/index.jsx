import React, { Component } from 'react';

/* Grafico */
import { Chart } from 'react-google-charts';
import '../../css/transito.css';

import {options} from './options.js';

export default class GraficoTransito extends Component {

  constructor(props) {
    super(props);
    this.feature = props.feature;
    this.state = {expandido:false}
  }

  alternarTamanhos = () => {
    this.setState({expandido: !this.state.expandido})
  }

  render() {
    const { expandido } = this.state
    const { data } = this.props;
    return (
      <div className={`transito ${expandido?'expandido':'normal'}`}>
        <div className="grafico">
          <Chart
            key="grafico-transito"
            chartType="LineChart"
            curveType='function'
            data={data}
            loader={<div>Obtendo dados</div>}
            options={options}
            graph_id="GraficoTransito"
            width="100%"
            height="100%"
            legend_toggle
          />
        </div>
        <div className="transito-legendas">
          <span className="vermelho"> Trânsito</span>
          <span className="azul"> Chuva</span>
          <span> Média de trânsito</span>
        </div>
        <div className="botoes">
          <div className='botao-expandir' onClick={(e)=>this.alternarTamanhos()} title="Expandir"><i className={`fa fa-${expandido?'compress':'expand'}`}></i></div>
          <button className="somente-expandido">-7D</button>
          <button className="somente-expandido">-2D</button>
          <button className="somente-expandido">-1D</button>
          <button className="somente-expandido">Hoje</button>
        </div>
        <br />
      </div>
    );
  }

  

}
