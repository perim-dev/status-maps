
const INITIAL_STATE = {lat:-22.9335,lng:-43.3206,zoom:11,
                        groupLayers:[]
                      };

export default (state = INITIAL_STATE, action) => {
    var novoEstado;
    switch(action.type){
        case 'MAP_LOAD':
            return {...state}
        case 'CARREGAR_PONTOS_CATEGORIA_MAPA':{
            novoEstado = {...state};
            var pontos = action.payload.data.slice();
            var icone = 'data:image;base64, '+ action.categoria.icone.replace('data:image;base64, ','');
            novoEstado.groupLayers[action.categoria.id] = {icone:icone,pontos:[]};

            pontos.map((ponto) => {
                ponto.geometry = JSON.parse(ponto.geometry)
                ponto.icone = action.categoria.icone;
                novoEstado.groupLayers[action.categoria.id].pontos.push(ponto);

                return novoEstado;
            });
            console.log(novoEstado.groupLayers);
            return {...state,mapa:novoEstado};
        }

        case 'REMOVER_PONTOS_CATEGORIA_MAPA':{
            novoEstado = {...state};
            delete novoEstado.groupLayers[action.idCategoria];
            return {...state,mapa:novoEstado};
        }
        default:
            return state
    }
}