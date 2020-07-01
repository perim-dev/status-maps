
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
            let icone = action.categoria.icone?'data:image;base64, '+ action.categoria.icone.replace('data:image;base64, ',''):'';
            novoEstado.groupLayers[action.categoria.id] = {id:action.categoria.id, icone:icone,pontos:[]};

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
            
            pontos = pontos.filter( (p) => JSON.parse(p.geometryAsGeoJSON).type.toLowerCase() === 'point') ;
            
            pontos.map((ponto)=> {
                ponto.icone = 'data:image;base64, '+ ponto.icone.replace('data:image;base64, ','')
                ponto.geometry = JSON.parse(ponto.geometryAsGeoJSON);
                return "";
            });

            let ponto = action.ponto;
            let i = novoEstado.groupLayers[ponto.categoriaId].pontos.findIndex(x => x.id === ponto.id);
            novoEstado.groupLayers[ponto.categoriaId].pontos[i].pontosRelacionados = pontos.slice();

            return {...state,mapa:novoEstado};
        }

        case 'CARREGAR_AREAS_DE_ATUACAO':{
            
            novoEstado = {...state};

            let areas = action.payload.data.slice();

            let ponto = action.ponto;
            let i = novoEstado.groupLayers[ponto.categoriaId].pontos.findIndex(x => x.id === ponto.id);
            novoEstado.groupLayers[ponto.categoriaId].pontos[i].areasDeAtuacao = areas.slice();

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