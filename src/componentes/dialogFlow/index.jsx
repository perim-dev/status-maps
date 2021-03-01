import React, { Component } from 'react';

/* Grafico */
import '../../css/dialog-flow.css';


export default class DialogFlow extends Component {

  constructor(props) {
    super(props);
    this.feature = props.feature;
    let expandido = props.singlePage || false;
    this.state = {expandido:expandido, data:[]}
    this.ativo = true;
  }
  
  alternarTamanhos = () => {
    this.setState({expandido: !this.state.expandido})
  }

  render() {
    const { expandido } = this.state

    return (
      <div className={`dialog-flow ${expandido?'expandido':'normal'}`}>
        <iframe
            allow="microphone;"
            width="100%"
            height="100%"
            src="https://console.dialogflow.com/api-client/demo/embedded/d6033a05-6897-45c9-bd76-c9165050b98f">
        </iframe>
        <div className="dialog-flow-botoes">
            <div className='dialog-flow-botao-expandir' onClick={(e)=>this.alternarTamanhos()} title="Expandir"><i className={`fa fa-${expandido?'compress':'expand'}`}></i></div>
        </div>
      </div>
    );
  }

  

}
