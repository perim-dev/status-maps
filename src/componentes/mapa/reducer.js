import config from '../../config'
const INITIAL_STATE = {lat:-22.9335,lng:-43.3206,zoom:11,
                        groupLayers:[]
                      };

export default (state = INITIAL_STATE, action) => {
    
    const ajusteCamera = (ponto) => {
        ponto.atributos.html = `<html><body><img onerror="this.src='${require('../../img/camera-not-found.png')}';this.style.width='80%'" style="width:100%" src="${config.URL_CAMERA_CET}${ponto.chaveExterna}"/></body></html>`;
        ponto.atributos.url = null;
    }

    var novoEstado;
    switch(action.type){
        case 'MAP_LOAD':
            return {...state}
        case 'CARREGAR_PONTOS_CATEGORIA_MAPA':{
            let cores = ['blue','yellow','green','orange','navy','purple'];
            novoEstado = {...state};
            let pontos = action.payload.data.slice();
            let icone = action.categoria.icone?'data:image;base64, '+ action.categoria.icone.replace('data:image;base64, ',''):'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Outside-Azure-icon.png';
            novoEstado.groupLayers[action.categoria.id] = {id:action.categoria.id, icone:icone,pontos:[], agrupado: action.categoria.agrupado};
            console.log(action);
            pontos.map((ponto) => {
                ponto.pontosRelacionados = [];
                ponto.geometry = JSON.parse(ponto.geometry)

                if(ponto.categoriaId * 1 === 55){
                    ajusteCamera(ponto);
                }

                if(ponto.geometry.type !== 'Point') {
                                        
                    if(!ponto.style) {
                        const cor = cores[Math.floor(Math.random() * cores.length)];
                        ponto.style = {
                            fillColor:cor,
                            color:cor,
                            weight:2,
                            fillOpacity:0.2
                        };
                    } else {
                        ponto.style = JSON.parse(ponto.style);
                    }

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

        case 'CARREGAR_CAMERAS_PROXIMAS':{
            
            novoEstado = {...state};

            let ponto = action.ponto;
            let i = novoEstado.groupLayers[ponto.categoriaId].pontos.findIndex(x => x.id === ponto.id);
            novoEstado.groupLayers[ponto.categoriaId].pontos[i].cameras = action.payload.data.slice();
            novoEstado.groupLayers[ponto.categoriaId].pontos[i].cameras.map( c => ajusteCamera(c));

            return {...state};
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
        
        case 'AGRUPAR_DESAGRUPAR_CATEGORIA':{
            console.log('desagrupar')
            novoEstado = {...state};
            novoEstado.groupLayers[action.categoria.id].agrupado = action.categoria.agrupado;

            return {...state,mapa:novoEstado};
        }

        default:
            return state
    }
}