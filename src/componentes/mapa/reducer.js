
const INITIAL_STATE = {lat:-22.9335,lng:-43.3206,zoom:11,
                        groupLayers:[]
                      };

export default (state = INITIAL_STATE, action) => {
    var novoEstado;
    switch(action.type){
        case 'MAP_LOAD':
            return {...state}
        case 'CARREGAR_PONTOS_CATEGORIA_MAPA':{
            let coresBairro = ['blue','yellow','green','orange','navy','purple'];
            novoEstado = {...state};
            let pontos = action.payload.data.slice();
            let icone = 'data:image;base64, '+ action.categoria.icone.replace('data:image;base64, ','');
            novoEstado.groupLayers[action.categoria.id] = {icone:icone,pontos:[]};

            pontos.map((ponto) => {
                ponto.pontosRelacionados = [];
                ponto.geometry = JSON.parse(ponto.geometry)

                if(ponto.geometry.type === 'Polygon' || ponto.geometry.type === 'MultiPolygon') {
                    ponto.geometry.coordinates[0] = ponto.geometry.coordinates[0].map((e) => [e[1],e[0]])
                    ponto.cor = coresBairro[Math.floor(Math.random() * coresBairro.length)];
                }
                
                novoEstado.groupLayers[action.categoria.id].pontos.push(ponto);

                return novoEstado;
            });
            return {...state,mapa:novoEstado};
        }

        case 'CARREGAR_PONTOS_RELACIONADOS_MAPA':{
            
            novoEstado = {...state};

            let pontos = action.payload.data.slice();

            pontos.map((ponto)=>{
                let icone = 'data:image;base64, '+ ponto.icone.replace('data:image;base64, ','');
                ponto.icone = icone;
                return "";
            });
            let ponto = action.ponto;
            let i = novoEstado.groupLayers[ponto.categoriaId].pontos.findIndex(x => x.id === ponto.id);
            novoEstado.groupLayers[ponto.categoriaId].pontos[i].pontosRelacionados = pontos.slice();

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