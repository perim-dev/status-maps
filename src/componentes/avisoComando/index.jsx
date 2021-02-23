import React, { Component } from 'react';
import '../../css/avisoComando.css';

import {enviarAviso} from './actions';

export default class AvisoComando extends Component {

    constructor(props){
        super(props);
        this.feature = props.feature;
        this.state = {descricao:"", endereco:"", latitude:props.lat,longitude:props.lng};
        console.log(this.state);
    }

    handleChangeDescricao = (event) => {
        this.setState({descricao: event.target.value});  
    }
    
    handleChangeEndereco = (event) => {
        this.setState({endereco: event.target.value});  
    }

    enviar = async () => {
        enviarAviso(this.state).then(resultado => {
            console.log(resultado)
            if(resultado.payload.status === 200){
                this.setState({})
                this.props.fechar();
                alert('Aviso enviado com sucesso');
            } else {
                alert(`Erro ao enviar o aviso \n${resultado.payload.data.mensagem}`);
            };
        }).catch(err => {
            console.log('ERRO',err);
            alert(`Erro ao enviar o aviso \n, ${err.data.mensagem}`);
        });
    }

    render(){

        return ( 
            <div className="aviso-comando"
                style={{left:this.props.left-5, top:this.props.top-5}}>
                    <div className="aviso-comando-barra-titulo">
                        <span className="aviso-comando-barra-titulo-label">Enviar aviso ao COMANDO</span>
                        <div className="aviso-comando-fechar"><i className="fa fa-times-circle" aria-hidden="true" title="Remover" onClick={() => this.props.fechar()}/></div>
                    </div>
                    <form>
                        <input type="text" value={this.state.descricao} onChange={this.handleChangeDescricao} placeholder="Informação / Descrição"/>
                        <input type="text" value={this.state.endereco} onChange={this.handleChangeEndereco} placeholder="Referência (opcional)"/>
                        <img className="aviso-comando-send" src={require('../../img/send.png')} alt="logo" onClick={this.enviar}/>
                    </form>
            </div> 
        );
    }
}
