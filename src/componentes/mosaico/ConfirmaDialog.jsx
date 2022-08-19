import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './confirma-dialog.css';



export class ConfirmaDialog extends Component {

    constructor(props){
        super(props);
    }

    handleChangeDescricao = (event) => {
        this.setState({descricao: event.target.value});  
    }
    
    handleChangeEndereco = (event) => {
        this.setState({endereco: event.target.value});  
    }
    
    render(){
        
        return ( 
            <div className="aviso-dialog" style={{marginTop:`${this.props.top}`,marginLeft:`${this.props.left}`}} >
                    <div className="aviso-dialog-barra-titulo">                        
                        <div className="aviso-dialog-fechar"><span className="aviso-dialog-barra-titulo-label">{this.props.titulo}</span><i className="fa fa-times-circle" aria-hidden="true" title="Fechar" onClick={() => this.props.fechar()}/></div>
                    </div>                    
                    <button className="aviso-dialog-send" alt="cancelar" onClick={() => this.props.fechar()}>Cancelar</button>
                    <button className="aviso-dialog-send" alt="confirmar" onClick={() => this.props.acao()}>Confirmar</button>
            </div> 
        );
    }
}
