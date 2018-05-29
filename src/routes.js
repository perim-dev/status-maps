import React,{ Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import AuthOrApp from './AuthOrApp';

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