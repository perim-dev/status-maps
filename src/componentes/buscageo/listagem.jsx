import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {marcarDesmarcarFiltro} from './actions';

import '../../css/buscageo.css';
import {Col} from 'react-bootstrap';

class Listagem extends Component {

    constructor(props){
        super(props);
        console.log(props);
        //this.centralizar = props.centralizar.bind(this);
    }

    render(){
        return (
            <div className={this.props.buscaGeo.acervos.length>0?'resultado-buscageo ativo':'resultado-buscageo inativo'} >
                <div className="row buscageo-filtro">
                {this.props.buscaGeo.acervos.map((acervo,idAcervo)=> 
                  <Col md={2} key={`buscageo-filtro-acervo` +idAcervo}>
                    <input  type="checkbox" 
                        checked={acervo.visivel} 
                        onChange={(e)=>this.props.marcarDesmarcarFiltro(acervo.id,e.target.checked)}
                        name={"buscageo_acervo_input"+acervo.id} 
                        id={"buscageo_acervo_input_"+acervo.id}/> {acervo.acervo}
                  </Col>
                )}
                </div>

                <div className="row" />

                {this.props.buscaGeo.acervos.map((acervo,idAcervo)=> {
                  return acervo.visivel && (
                  acervo.pontos.map((p,idx) =>
                    <Col xs={12} sm={12} md={4} lg={4} className="ponto" key={`buscageo-pontos` +idx}>
                      <img src={p.icone} alt={p.descricao} onClick={(e)=>this.props.centralizar(p)}/>
                      <span className="texto"> 
                        {p.descricao}
                      </span>
                    </Col> )
                  )}
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({buscaGeo: state.buscaGeo});
const mapDispatchToProps = dispatch => bindActionCreators({marcarDesmarcarFiltro}, dispatch); 
export default connect(mapStateToProps, mapDispatchToProps)(Listagem) ;