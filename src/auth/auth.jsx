import React, { Component } from 'react'
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {login} from './actions';
import { bindActionCreators } from 'redux';

import {Row,Col} from 'react-bootstrap';

class Auth extends Component {
    
    constructor(props){
        super(props); 
        this.username = "";
        this.password = ""; 
    }

    onSubmit(values){
        let retorno = this.props.login(values);
        console.log("retorno",retorno);
    }

    render(){
        console.log("form error",this.props.error)
        const {handleSubmit} = this.props;
        return (
            <div className="container login">
                <div className="panel panel-default center-block bg-grafite">
                    <div className="panel-body">
                        <img src={require('../img/aguia.png')} alt="logo" className="logo"/>
                        <form onSubmit={handleSubmit(v =>this.onSubmit(v))} className="form" role="form">
                            <Row className="form-group">
                                <Col mdOffset={2} md={8} xs={12} sm={12}>
                                    <Field className="form-control" name="username" component="input" type="text" placeholder="Usuário"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col mdOffset={2} md={8} xs={12} sm={12}>
                                    <Field className="form-control"name="password" component="input" type="password" placeholder="Senha"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col mdOffset={2} md={8} xs={12} sm={12}>
                                    <div className="error">{this.props.auth.messageError}</div>
                                </Col>
                            </Row>
                            <button className="btn btn-primary" type="submit" >Autenticar</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Auth = reduxForm({form:'authForm'})(Auth)
const mapStateToProps = state => ({auth: state.auth});
const mapDispatchToProps = dispatch => bindActionCreators({login}, dispatch); 
export default connect(mapStateToProps, mapDispatchToProps)(Auth) ;