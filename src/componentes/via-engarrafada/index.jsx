import React, { Component } from 'react';


import '../../css/via-engarrafada.css';

import {buscarDadosViaEngarrafada} from './actions';
const intervaloDeAtualização = 5*60000; // 5 minutos
export default class ViaEngarrafada extends Component {

  constructor(props) {
    super(props);
    this.feature = props.feature;
    this.state = {data:[]}
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
    const response = await buscarDadosViaEngarrafada(token);
    const { status = 300} = response.payload;

    if( status === 200){
      const dataResponse = response.payload.data;
      this.setState({data: dataResponse});
    } else {
      this.setState({data: []});
      console.log("falha ao receber dados da API")
    }
  }

  refresh = () =>{
    setTimeout(()=> {
      this.atualizaDados();
      if(this.ativo) {
        this.refresh();
      }
    } ,intervaloDeAtualização);
  }

  render() {
    const { data } = this.state;

    return data && data.length > 0 && 
    (
      <div className="via-engarrafada">   
        <div className="via-engarrafada-item titulo">
          <div className="nome">Via engarrafada</div>
          <div className="velocidade"> Km/h </div>
          <div className="tamanho"> Tamanho</div>
        </div>
        { data.map((via, idx) => { 
          return (
          <div className="via-engarrafada-item" key={`via-engarrafada-item${idx}`}>
            <div className="nome"> {via.via}</div>
            <div className="velocidade"> {via.velocidade} </div>
            <div className="tamanho tamanho-fonte"> <span className="barra-tamanho" style={{width:via.tamanho}}/> <span>{via.tamanho} km</span></div>
          </div>)
        })}
      </div>
    );
  }
}
