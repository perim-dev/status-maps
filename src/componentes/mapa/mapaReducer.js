
const INITIAL_STATE = {lat:-22.9335,lng:-43.3206,zoom:11,
                        groupLayers:[]
                      };

export default (state = INITIAL_STATE, action) => {
    var novoEstado;
    switch(action.type){
        case 'MAP_LOAD':
            // return { ...state, lista:action.payload.data}
            return {...state}
        case 'CARREGAR_PONTOS_CATEGORIA_MAPA':{
            novoEstado = {...state};
            var pontos = action.payload.data.slice();

            novoEstado.groupLayers[action.idCategoria] = [];

            pontos.map((ponto) => {
                ponto.geometry = JSON.parse(ponto.geometry)
                novoEstado.groupLayers[action.idCategoria].push(ponto);

                return novoEstado;
            });
            return {...state,mapa:novoEstado};
        }

        case 'REMOVER_PONTOS_CATEGORIA_MAPA':{
            novoEstado = {...state};
            novoEstado.groupLayers[action.idCategoria] = [];
            return {...state,mapa:novoEstado};
        }
        default:
            return state
    }
}