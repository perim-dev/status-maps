import axios from 'axios';
import config from '../../config';

const auth = {'Authorization':'Basic MjYyMjYyNTU6MTIzNDU='}

export const carregarPontosDaCategoria = async (categoria) => {
    var resource = config.url + config.resources.categoria +'/'+ categoria.id + "/pontosDeInteresse";
    const request = await axios.get(`${resource}`,{headers: auth});
 
    return {
        type: 'CARREGAR_PONTOS_CATEGORIA_MAPA',
        payload: request,
        categoria:  categoria
    };
}

export const removerPontosDaCategoria = async (id) => {
    /* Limpa os pontos da categoria */
    return {
        type: 'REMOVER_PONTOS_CATEGORIA_MAPA',
        payload: {},
        idCategoria:  id

    };
}