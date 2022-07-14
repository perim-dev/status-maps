import axios from 'axios';
import config from '../../config.js';

export const load = async() => {
    const resource = config.url + config.resources.acervo;
    const request = await axios.get(`${resource}?fields=categorias`);

    return {
        type: 'ACERVO_LOAD',
        payload: request
    }
}

export const acervoChangeCheck = (event, acervo) => ({
    type: 'ACERVO_CHANGE_CHECK',
    payload: event.target.checked,
    acervo_id: acervo.id
})

export const categoriaChangeCheck = (event,acervo,categoria) => ({
    type: 'CATEGORIA_CHANGE_CHECK',
    payload: event.target.checked,
    acervo_id: acervo.id,
    categoria_id: categoria.id 
})

export const expandirComprimirCategorias = (acervo) => ({
    type: 'EXPANDIR_COMPRIMIR_CATEGORIAS',
    acervo_id: acervo.id,
})

export const agruparDesagruparAcervo = (acervo) => ({
    type: 'AGRUPAR_DESAGRUPAR_ACERVO',
    acervo_id: acervo.id,
})