import React, { Component } from 'react';
import {Col, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import ArvoreAcervo from './arvore-acervos';
import {logout} from '../../auth/actions';
import logo from '../../img/logo-cor.png';

class ListaLateral extends Component {
  render() {
    const {ocultar} = this.props;

    return (
        <Col xsHidden={true} sm={3} md={3} lg={3} className="modulo h-100" hidden={ocultar}>
          <div className="area-titulo">
            <div className="area-titulo box area-titulo-logo">
              <img src={logo} alt="logo"/>
            </div>
            <div onClick={(e)=>this.props.logout()} className="logout"> 
              <i className="fa fa-sign-out" title="Sair"></i> 
            </div>            
          </div>
          <Panel header="Acervos"  className="lista-lateral hidden-sm-up nopadding bg-grafite modulo" >
              <ArvoreAcervo controleRemotoSocket={this.props.controleRemotoSocket}/>
          </Panel>
          <br />
        </Col>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch); 
export default connect(null, mapDispatchToProps)(ListaLateral) ;

