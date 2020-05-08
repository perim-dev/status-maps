import React, { Component } from 'react';

import {buscarDadosGraficoTransito} from './actions';
import { createStore } from 'redux';
import reducer from './reducer';
import moment from 'moment'

/* Grafico */
import { Chart } from 'react-google-charts';
import '../../css/transito.css';

import {options} from './options.js';

const store = createStore(reducer);
const dataReferencia = '2020-01-01'; // Deve estar igual ao do arquivo options.js
const intervaloDeAtualização = 180000;
export default class GraficoTransito extends Component {

  constructor(props) {
    super(props);
    this.feature = props.feature;
    let expandido = props.singlePage || false;
    this.hideButtons = props.hideButtons || false;
    this.state = {expandido:expandido, data:[], filtro:moment().format("YYYY-MM-DD")}
    this.ativo = true;
  }
  
  componentDidMount(){
    this.atualizaDados(this.state.filtro);
    this.refresh();
  }

  componentWillUnmount(){
    this.ativo = false;
  }

  atualizaDados = async () => {
    const {token=undefined} = this.props;
    const response = await buscarDadosGraficoTransito(this.state.filtro, token);
    const { status = 300} = response.payload;

    if( status === 200){
      const dataResponse = response.payload.data;
      let newData = [['Hora','Trânsito', 'Histórico', 'Pluviômetro']];

      //newData.push([new Date(`${dataReferencia} 00:16`),50,100,65])
      //newData.push([new Date(`${dataReferencia} 01:17`),60,90,90])
      dataResponse.map((dado) => newData.push([new Date(`${dataReferencia} ${dado[0]}`),dado[1], dado[2], dado[3]]));
      this.setState({data: newData});
      console.log(newData);

    } else {
      this.setState({data: []});
      console.log("falha ao receber dados da API")
    }
  }

  refresh = () =>{
    setTimeout(()=> {
      this.atualizaDados(this.state.filtro);
      if(this.ativo) {
        this.refresh();
      }
    } ,intervaloDeAtualização);
  }

  alternarTamanhos = () => {
    this.setState({expandido: !this.state.expandido})
  }

  alterarFiltro = async (qtdeDias) => {
    await this.setState({filtro:moment().subtract(qtdeDias, 'days').format("YYYY-MM-DD")});
    this.atualizaDados();
  }

  render() {
    const { expandido, data } = this.state

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
          <span className="azul"> Chuva</span>
          <span> Média de trânsito</span>
          <span className="vermelho"> Trânsito</span>
        </div>
        <div className="titulo-data-filtro">
          <span> Dia: {moment(this.state.filtro).format("DD-MM-yyyy")}</span>
        </div>
        {!this.hideButtons && (
          <div className="botoes">
            <div className='botao-expandir' onClick={(e)=>this.alternarTamanhos()} title="Expandir"><i className={`fa fa-${expandido?'compress':'expand'}`}></i></div>
            <button className="somente-expandido" onClick={()=>this.alterarFiltro(7)}> -7D </button>
            <button className="somente-expandido" onClick={()=>this.alterarFiltro(2)}> -2D </button>
            <button className="somente-expandido" onClick={()=>this.alterarFiltro(1)}> -1D </button>
            <button className="somente-expandido" onClick={()=>this.alterarFiltro(0)}> Hoje </button>
          </div>
        )}
      </div>
    );
  }

  

}
