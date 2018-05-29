
import React, { Component } from 'react'
import {connect} from 'react-redux';

import Main from './Main';
import Auth from './auth/auth';

class AuthOrApp extends Component {
    
    render(){
        if(this.props.auth.validToken){
            // Ver como usar
            //axios.defaults.headers.common['authorization'] = {}
            return <Main>{this.props.children}</Main>
        } else {
            return <Auth/>
        }
    }
}

// export default AuthOrApp;

const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps,null)(AuthOrApp) ;