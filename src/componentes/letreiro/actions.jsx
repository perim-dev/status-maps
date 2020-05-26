import axios from 'axios';
import config from '../../config';

// const headers = {'Content-Type': 'application/json'}

export const buscarDadosEstagioOperacional = async () => {
    
    var resource = config.apiEstagioAtencao;
    try {
        const request = await axios.get(`${resource}`);

        return {
            type: 'BUSCAR_DADOS_ESTAGIO_OPERACIONAL',
            payload: request,
        };
    } catch (e) {
        return {
            payload: {},
        };
    }
}

