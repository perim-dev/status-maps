import axios from 'axios';
import config from '../../config';

const auth = {'Authorization':'Basic MjYyMjYyNTU6MTIzNDU='}

export const buscarPontos = async (geojson) => {
    
    // TODO  pegar URL completa

    var resource = config.url + config.resources.categoria +'/'+ categoria.id + "/pontosDeInteresse";
    const request = await axios.get(`${resource}`,{headers: auth});
 
    return {
        type: 'BUSCAR_PONTOS',
        payload: request
    };
}