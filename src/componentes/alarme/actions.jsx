import axios from 'axios';
import config from '../../config';

const headers = {'Content-Type': 'application/json'}

export const buscarAlarmesDisparados = async () => {

    var resource = config.url + config.resources.alarme +'/alarmando';
    const request = await axios.get(`${resource}`,{headers: headers});

    return {
        type: 'BUSCAR_ALARMES_DISPARADOS',
        payload: request
    };
}

export const limparAlarmes = () => {
    return {
        type: 'LIMPAR_ALARMES'
    };
}