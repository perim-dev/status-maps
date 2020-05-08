import React, { Component } from 'react'

/* Gráfico de trânsito */
import GraficoTransito from '../componentes/grafico-transito';
import '../css/transito.css';

class GraficoTransitoSinglePage extends Component {
    
    getToken = () => {
        const { search = '' } = this.props.location;

        if(search.indexOf('token=') === -1){
            return '';
        }
        // Remove ?, cria arrays pelo "&" e depois pega o parâmetro do token
        return search.replace("?","").split("&").filter((p) => p.indexOf('token=') > -1)[0].replace("token=","");
    }

    render() {
        
        console.log(this.getToken());
        return (
            <div className="single-page">
                <GraficoTransito singlePage={true} hideButtons={true} token={this.getToken()}/>
            </div>
        );
    }
}

export default GraficoTransitoSinglePage;