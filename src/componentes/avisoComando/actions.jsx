import axios from 'axios';
import config from '../../config';

const headers = {'Content-Type': 'application/json'}

export const enviarAviso = async (aviso) => {

    var resource = config.URL_COMANDO+'/aviso';
    console.log(aviso);
    if(!aviso.endereco || aviso.endereco === ''){
        aviso.endereco = " ";
    }
    const parametros = {
        validateStatus: (status) => {
            return true; // I'm always returning true, you may want to do it depending on the status received
        },
        headers
    }
    const request = await axios.post(`${resource}`,aviso,parametros);

    return {
        type: 'AVISO-COMANDO',
        payload: request
    };
}
