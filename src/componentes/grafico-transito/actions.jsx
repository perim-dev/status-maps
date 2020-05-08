import axios from 'axios';
import config from '../../config';

const headers = {'Content-Type': 'application/json'}

export const buscarDadosGraficoTransito = async (data, token ) => {
    
    var resource = config.url + config.resources.graficoTransito +`/${data}`;

    if(token){
        headers.Authorization = `Basic ${token}`
    }
    
    console.log(config.url + config.resources.graficoTransito +`/${data}`, headers, token);

    const request = await axios.get(`${resource}`,{headers: headers});

    return {
        type: 'BUSCAR_DADOS_GRAFICO_TRANSITO',
        payload: request,
    };
}

