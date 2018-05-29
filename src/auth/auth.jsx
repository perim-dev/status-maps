import React, { Component } from 'react'
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {login} from './actions';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';

import {Row,Col} from 'react-bootstrap';

class Auth extends Component {
    
    constructor(props){
        super(props); 
        this.state = {fireRedirect: false};
        this.username = "";
        this.password = ""; 
    }

    onSubmit(values){
        this.props.login(values);
        this.setState({ fireRedirect: true })
    }

    render(){
        const {handleSubmit} = this.props;
        // const { from } = this.props.location.state || '/';
        const { fireRedirect } = this.state;
        console.log(handleSubmit);
        return (
            <div className="container login">
                <div className="panel panel-default center-block">
                    <div className="panel-body">
                        <form onSubmit={handleSubmit(v =>this.onSubmit(v))} className="form" role="form">
                            <Row>
                                <Col md={12}>
                                    <Field className="form-control" name="username" component="input" type="text" placeholder="Usuário"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Field className="form-control"name="password" component="input" type="password" placeholder="Senha"/>
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
const mapDispatchToProps = dispatch => bindActionCreators({login}, dispatch); 
export default connect(null, mapDispatchToProps)(Auth) ;