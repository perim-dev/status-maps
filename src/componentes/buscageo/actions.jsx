import axios from 'axios';
import config from '../../config';

const headers = {'Content-Type': 'application/json'}

export const buscarPontos = async (geojson) => {
    console.log(geojson)
    var resource = config.url + config.resources.pontoDeInteresse +'/pontosDaArea';
    const request = await axios.put(`${resource}`,JSON.stringify(geojson),{headers: headers});
    console.log(request);
    return {
        type: 'BUSCAR_PONTOS',
        payload: request
    };
}

export const marcarDesmarcarFiltro = (acervoId, marcado) => {
    
    return {
        type: 'MARCAR_DESMARCAR_FILTRO',
        payload: {acervoId:acervoId, marcado:marcado}
    }
}

export const limparPontos = () => {
    
    return {
        type: 'LIMPAR_PONTOS'
    };
}