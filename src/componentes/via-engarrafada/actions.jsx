import axios from 'axios';
import config from '../../config';

const headers = {'Content-Type': 'application/json'}

export const buscarDadosViaEngarrafada = async (token ) => {
    
    var resource = config.url + config.resources.graficoEngarrafamento;

    if(token){
        headers.Authorization = `Basic ${token}`
    }
    
    const request = await axios.get(`${resource}`,{headers: headers});

    return {
        type: 'BUSCAR_DADOS_GRAFICO_ENGARRAFAMENTO',
        payload: request,
    };
}

