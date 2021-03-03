import React, { Component } from 'react';

import {buscarDadosGraficoTransito} from './actions';
import moment from 'moment'

/* Grafico */
import { Chart } from 'react-google-charts';
import '../../css/transito.css';

import ViaEngarrafada from '../via-engarrafada';

import {options} from './options.js';

// const dataReferencia = '2020-01-01'; // Deve estar igual ao do arquivo options.js
const intervaloDeAtualização = 180000;
export default class GraficoTransito extends Component {

  constructor(props) {
    super(props);
    this.feature = props.feature;
    let expandido = props.singlePage || false;
    this.hideButtons = props.hideButtons || false;
    this.state = {expandido:expandido, data:[], filtro:moment().format("YYYY-MM-DD"),options:options}
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
      let {options, filtro} = this.state;
      let maximizado = false;
      dataResponse.map((dado) => {

        if(dado[1] > 200 || dado[2] > 200 || dado[3]>100){
          maximizado = true;
        }
        return newData.push([new Date(`${this.state.filtro} ${dado[0]}`),dado[1], dado[2], dado[3]]);
      });

      options.vAxes[0].viewWindow.max = maximizado ? options.limites.maximizado.pluviometro : options.limites.normal.pluviometro;
      options.vAxes[1].viewWindow.max = maximizado ? options.limites.maximizado.transito : options.limites.normal.transito;
      options.vAxes[2].viewWindow.max = maximizado ? options.limites.maximizado.transito : options.limites.normal.transito;
      options.hAxis.viewWindow.min = new Date(`${filtro} 00:00:00`);
      options.hAxis.viewWindow.max = moment(`${filtro} 00:00:00`,'YYYY-MM-DD HH:mm:ss').add(1,'days').toDate();
      //moment(startdate, "DD-MM-YYYY").add(5, 'days')

      this.setState({data: newData, options:options});

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
    
    const { expandido, data, options } = this.state;
    
    const { exibir, onClick } = this.props;

    return (
      <span>
        {!this.props.singlePage && <GTButtonMenu exibir={exibir} onClick={onClick}/>}
        {(exibir || this.props.singlePage) &&
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
                <button className="somente-expandido" onClick={()=>this.alterarFiltro(7)}> -7D </button>
                <button className="somente-expandido" onClick={()=>this.alterarFiltro(2)}> -2D </button>
                <button className="somente-expandido" onClick={()=>this.alterarFiltro(1)}> -1D </button>
                <button className="somente-expandido" onClick={()=>this.alterarFiltro(0)}> Hoje </button>
              </div>
            )}
            <div className="via-engarrafada-modulo">
              <ViaEngarrafada />
            </div>
            {!this.hideButtons && (
              <div className="botoes">
                <div className='botao-expandir' onClick={(e)=>this.alternarTamanhos()} title="Expandir"><i className={`fa fa-${expandido?'compress':'expand'}`}></i></div>
              </div>
            )}

          </div>}
      </span>
    );
  }

}

export const GTButtonMenu = (props) => {
  return (
    <div className="transito-menu-button">
    <div className={`transito-menu-button-conteudo `+ (props.exibir?'ativo':'')} onClick={(e)=>props.onClick(e)} title="Gráfico de trânsito"><i className="fa fa-area-chart"></i></div>
    </div>
  )
}