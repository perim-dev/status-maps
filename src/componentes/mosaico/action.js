import axios from "axios";

import config from "../../config";

const resource = config.url + config.resources.mosaico;    

export const adicionarCameraAoMosaico = async (body) => {            
        const data = await axios.put(`${resource}`,body);    
    return {
        type: 'ADICIONAR_CAMERA_AO_MOSAICO',
        payload: data 
    };
}

export const carregarMosaicos = async () => {            
    const data = await axios.get(resource);       
    return {
        type: 'CARREGAR_MOSAICOS',
        payload: data
    };
}

export const adicionarMosaico = async (body) => {                                    
    const data = await axios.post(`${resource}`,body);            
    return {
        type: 'ADICIONAR_MOSAICO',
        payload: data
    };
}

export const excluirCameraDoMosaico = async (params) => {                                    
    const {id, camera} = params;    
    const data = await axios.delete(`${resource}/${id}/camera/${camera}`);            
    return {
        type: 'EXCLUIR_CAMERA_DO_MOSAICO',
        payload: data
    };
}

export const limparPainel = () => {
    return {
        type: 'LIMPAR_PAINEL',
        payload: {}
    };
}