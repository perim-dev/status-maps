import React,{ Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, hashHistory} from 'react-router-dom';

import AuthOrApp from './AuthOrApp';
import Main from './Main';

class Rotas extends Component {
    render(){
        return (
            <Router >
                <Route path="/" component={AuthOrApp}/>
            </Router>
        )
    }
}

export default Rotas;