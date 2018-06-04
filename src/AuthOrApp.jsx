
import React, { Component } from 'react'
import {connect} from 'react-redux';
import axios from 'axios';

import Main from './Main';
import Auth from './auth/auth';

class AuthOrApp extends Component {
    
    render(){
        if(this.props.auth.validToken && this.props.auth.token){
            axios.defaults.headers.common['Authorization'] = this.props.auth.token;
            return <Main>{this.props.children}</Main>
        } else {
            return <Auth/>
        }
    }
}

// export default AuthOrApp;

const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps,null)(AuthOrApp) ;