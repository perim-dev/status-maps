import axios from 'axios';
import config from '../../config';

export const carregarPontosDaCategoria = async (categoria) => {
    
    var resource = config.url + config.resources.categoria +'/'+ categoria.id + "/pontosDeInteresse";
    const request = await axios.get(`${resource}`);
 
    return {
        type: 'CARREGAR_PONTOS_CATEGORIA_MAPA',
        payload: request,
        categoria:  categoria
    };
}

export const carregarAreaDeAtuacao = async (ponto) => {
    var resource = config.url + config.resources.pontoDeInteresse +'/'+ ponto.id + "/detalhamento/areas";
    const request = await axios.get(`${resource}`);
 
    return {
        type: 'CARREGAR_AREAS_DE_ATUACAO',
        payload: request,
        ponto: ponto
    };
}

export const carregarPontosRelacionados = async (ponto) => {
    var resource = config.url + config.resources.pontoDeInteresse +'/'+ ponto.id + "/pontosRelacionados";
    const request = await axios.get(`${resource}`);
 
    return {
        type: 'CARREGAR_PONTOS_RELACIONADOS_MAPA',
        payload: request,
        ponto: ponto
    };
}

export const carregarCamerasProximas = async (ponto) => {
    var resource = config.url + config.resources.pontoDeInteresse +'/'+ ponto.id + "/cameras";
    const request = await axios.get(`${resource}`);
 
    return {
        type: 'CARREGAR_CAMERAS_PROXIMAS',
        payload: request,
        ponto: ponto
    };
}

export const agruparDesagruparCategoria = async (categoria) => {

    return {
        type: 'AGRUPAR_DESAGRUPAR_CATEGORIA',
        payload: null,
        categoria: categoria
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