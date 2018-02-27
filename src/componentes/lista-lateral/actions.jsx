import axios from 'axios';
import config from '../../config.js';

export const load = async() => {
    const auth = {'Authorization':'Basic MjYyMjYyNTU6MTIzNDU='}
    const resource = config.url + config.resources.acervo;
    const request = await axios.get(`${resource}?fields=categorias`,{headers: auth});
    console.log("lista lateral actions",request);
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