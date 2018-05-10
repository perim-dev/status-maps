
const INITIAL_STATE = {pontos:[]};

export default (state = INITIAL_STATE, action) => {
    var novoEstado;
    switch(action.type){
        case 'BUSCAR_PONTOS':{
            novoEstado = {...state};

            let pontos = action.payload.data.slice();

            pontos.map((ponto) => {
                ponto.pontosRelacionados = [];
                ponto.geometry = JSON.parse(ponto.geometryAsGeoJSON);
                let icone = 'data:image;base64, '+ ponto.icone.replace('data:image;base64, ','');
                ponto.icone = icone;
                novoEstado.pontos.push(ponto);
                return ponto;
            });
            
            return {...state,pontos:novoEstado.pontos};
        }
        
        case 'LIMPAR_PONTOS':{
            return {...state,pontos:[]};
        }

        default : {
            return {...state};
        }
    }
}