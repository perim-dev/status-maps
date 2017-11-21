import axios from 'axios';

const URL = 'http://localhost:8080/status/api/v1/';
const config = {'Authorization':'Basic MjYyMjYyNTU6MTIzNDU='}

export const carregarPontosDaCategoria = async (id) => {

    var resource = URL + "categorias/" + id + "/pontosDeInteresse";
    const request = await axios.get(`${resource}`,{headers: config});
    return {
        type: 'CARREGAR_PONTOS_CATEGORIA_MAPA',
        payload: request,
        idCategoria:  id
    };
}

export const removerPontosDaCategoria = async (id) => {
    /* Limpa os pontos da categoria */

    var resource = URL + "categorias/" + id + "/pontosDeInteresse";
    const request = await axios.get(`${resource}`,{headers: config});
    return {
        type: 'REMOVER_PONTOS_CATEGORIA_MAPA',
        payload: request,
        idCategoria:  id
    };
}