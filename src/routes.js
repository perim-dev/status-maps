import React,{ Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AuthOrApp from './AuthOrApp';
import GraficoTransitoSinglePage from './grafico-transito-single-page'

class Rotas extends Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/graficotransito" component={GraficoTransitoSinglePage}/>
                    <Route path="/" component={AuthOrApp}/>
                </Switch>
            </Router>
        )
    }
}

export default Rotas;