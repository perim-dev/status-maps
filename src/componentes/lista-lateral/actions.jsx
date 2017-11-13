import axios from 'axios';

const URL = 'http://localhost:8080/status/api/v1/acervos';

export const load = () => {
    const request = axios.get(`${URL}`);
    return {
        type: 'ACERVO_LOAD',
        payload: request
    }
}

export const changeCheck = (event) => ({
    type: 'ACERVO_CHANGE_CHECK',
    payload: event.target.value 
})