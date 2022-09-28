import React, { Component } from 'react';

import '../../css/letreiro.css';

import { buscarDadosEstagioOperacional } from './actions';

const intervaloDeAtualização = 3 * 60000; // 3 minutos
export default class Letreiro extends Component {

  constructor(props) {
    super(props);
    this.feature = props.feature;
    this.state = { data: {} }
    this.ativo = true;
    this.linha1Ref = null;
    this.linha2Ref = null;
    this.baseRef = null;
    this.revealRef = null;
  }

  componentDidMount() {
    this.atualizaDados();
    this.refresh();
    setTimeout(() => this.animar(), 2000);
  }

  componentWillUnmount() {
    this.ativo = false;
  }

  atualizaDados = async () => {
    const response = await buscarDadosEstagioOperacional();
    const { status = 300 } = response.payload;
    if (status === 200) {
      const dataResponse = response.payload.data;
      this.setState({ data: dataResponse });
      this.props.updateLetreiroInfo(dataResponse);

    } else {
      this.props.updateLetreiroInfo({ "cor": "rgba(255,255,255,0.2)", "estagio": "Normalidade", offline: true });
      this.setState({ data: {} });
      console.log("falha ao receber dados da API de mudança de estágio")
    }

  }

  refresh = () => {
    setTimeout(() => {

      this.atualizaDados();
      if (this.ativo) {
        this.refresh();
        this.animar();
      }
    }, intervaloDeAtualização);
  }

  animar = () => {
    const { data } = this.state;
    const r = document.querySelector(':root');

    if (this.linha1Ref) {
      r.style.setProperty('--tamanhoElementoLinha1', `-${this.linha1Ref.clientWidth}px`);
    }

    if (this.linha2Ref) {
      r.style.setProperty('--tamanhoElementoLinha2', `-${this.linha2Ref.clientWidth}px`);
    }

    if (this.baseRef) {

      if (data.mensagem2 && data.mensagem2 !== '') {
        this.baseRef.style.height = '70px';
      } else {
        this.baseRef.style.height = '45px';
      }
    }
  }

  render() {
    const { data } = this.state;

    return (

      <div>

        {data && data.mensagem && (

          <div className="letreiro scroll-left background-teste" ref={(ref) => this.baseRef = ref} onClick={() => this.animar()} >
            <div id="linha1" ref={(ref) => this.linha1Ref = ref} className="texto" style={{ color: data.cor }}>{data.mensagem}</div>
            <div id="linha2" ref={(ref) => this.linha2Ref = ref} className="texto" style={{ color: data.cor2 || 'yellow' }}>{data.mensagem2}</div>
          </div>
        )}
      </div>

    )
  }
}
