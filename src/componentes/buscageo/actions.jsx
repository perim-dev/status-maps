import axios from 'axios';
import config from '../../config';

const auth = {'Authorization':'Basic MjYyMjYyNTU6MTIzNDU=','Content-Type': 'application/json'}

export const buscarPontos = async (geojson) => {
    
    var resource = config.url + config.resources.pontoDeInteresse +'/pontosDaArea';
    const request = await axios.put(`${resource}`,JSON.stringify(geojson),{headers: auth});

    return {
        type: 'BUSCAR_PONTOS',
        payload: request
    };
}

export const limparPontos = () => {
    
    return {
        type: 'LIMPAR_PONTOS'
    };
}