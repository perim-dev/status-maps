
import React, { Component } from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';

import Main from './Main';
import Auth from './auth/auth';



// import {validatedToken} from './auth/actions';

class AuthOrApp extends Component {
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props.auth);
        if(this.props.auth.validToken){
            // Ver como usar
            // axios.defaults.headers.common['authorization'] = {}
            return <Main>{this.props.children}</Main>
        } else {
            return <Auth/>
        }
    }
}

// export default AuthOrApp;

const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps,null)(AuthOrApp) ;