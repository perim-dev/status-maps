import React, { Component } from 'react';

import '../../css/letreiro.css';

import {buscarDadosEstagioOperacional} from './actions';
const intervaloDeAtualização = 3000;//5*60000; // 5 minutos
export default class Letreiro extends Component {

  constructor(props) {
    super(props);
    this.feature = props.feature;
    this.state = {data:{}}
    this.ativo = true;
  }
  
  componentDidMount(){
    this.atualizaDados();
    this.refresh();
  }

  componentWillUnmount(){
    this.ativo = false;
  }

  atualizaDados = async () => {
    const response = await buscarDadosEstagioOperacional();
    const { status = 300} = response.payload;
    if( status === 200 ){
      const dataResponse = response.payload.data;
      this.setState({data: dataResponse});
      this.props.updateLetreiroInfo(dataResponse);
    } else {
      this.props.updateLetreiroInfo({"cor": "rgba(255,255,255,0.2)", "estagio": "Normalidade",offline:true});
      this.setState({data: {}});
      console.log("falha ao receber dados da API de mudança de estágio")
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

    return (
        <div>
          { data && data.mensagem && (
          <div className="letreiro scroll-left">   
            <p className="texto" style={{color:data.cor}}>{data.mensagem}</p>
          </div>
          )}
        </div>
      
    )
  }
}
