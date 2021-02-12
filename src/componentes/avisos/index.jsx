import React, { Component } from 'react';
import moment from 'moment';

import '../../css/avisos.css';
import GerenciadorDeAvisos from '../../utils/GerenciadorDeAvisos';

export default class Avisos extends Component {

  constructor(props) {
    super(props);
    this.feature = props.feature;
    let expandido = props.singlePage || false;
    this.hideButtons = props.hideButtons || false;
    this.state = {expandido:expandido, avisos:[]}
    this.ativo = true;
    this.atualizador = null;
    this.onRemove = props.onRemove;
  }
  
  componentDidMount(){
    this.atualizaDados();
    this.atualizador = setInterval( () => this.atualizaDados(),60000);
  }

  componentWillUnmount(){
    this.ativo = false;
    clearInterval(this.atualizador);
  }

  atualizaDados = async () => {
    let avisos = GerenciadorDeAvisos.ler();
    avisos.forEach(a => {
      let agora = moment();
      var intervalo = moment.duration(agora.diff(a.data)).asMilliseconds();
      
      if( intervalo/1000 < 60) {
        a.intervalo = `Há ${Math.round(intervalo/1000)} seg`;
      } else if(intervalo/1000/60 < 60) {
        a.intervalo = `Há ${Math.round(intervalo/1000/60)} min`;
      } else {
        a.intervalo = `Há ${Math.round(intervalo/1000/60/60)} hr`;
      }
    })

    this.setState({avisos});  
  }

  alternarTamanhos = () => {
    this.setState({expandido: !this.state.expandido})
  }

  removerAviso = (id) => {
    GerenciadorDeAvisos.remover(id);
    this.atualizaDados();
    this.onRemove();
  }

  render() {
    const { expandido, avisos } = this.state

    return (
      <div className={`avisos ${expandido?'expandido':'normal'}`}>
        <div className="avisos-mensagens">
          <div className="avisos-mensagens-body">
            {avisos.map( aviso => (
              <div className="avisos-mensagem-item" key={`${aviso.data}-${aviso.titulo}`}>
                <div className="avisos-mensagem-barra-titulo">
                  <div className="avisos-mensagem-titulo">
                    {aviso.titulo}
                  </div>
                  <div className="avisos-mensagem-datahora">
                    {aviso.intervalo}
                  </div>
                  <div className="avisos-mensagem-fechar">
                    <i className="fa fa-times-circle" aria-hidden="true" title="Remover" onClick={() => this.removerAviso(aviso.id)}/>
                  </div>
                </div>
                <div className="avisos-mensagem-texto">
                  {aviso.mensagem}
                </div>
              </div>
            ))}
          </div>

        </div>
        {!this.hideButtons && (
          <div className="avisos-botoes">
            <div className='avisos-botao-expandir' onClick={(e)=>this.alternarTamanhos()} title={`${expandido?'Reduzir':'Expandir'}`}><i className={`fa fa-${expandido?'compress':'expand'}`}></i></div>
          </div>
        )}

      </div>
    );
  }

  

}
