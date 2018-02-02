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

export const changeCheck = (event) => ({
    type: 'ACERVO_CHANGE_CHECK',
    payload: event.target.value 
})