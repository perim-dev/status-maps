
const INITIAL_STATE = {pontos:[]
                      };

export default (state = INITIAL_STATE, action) => {
    var novoEstado;
    switch(action.type){
        case 'BUSCAR_PONTOS':{
            novoEstado = {...state};
            console.log("action BUSCAR_PONTOS de buscaGeo ",action.payload.data);
            /*
            let pontos = action.payload.data.slice();
            let icone = 'data:image;base64, '+ action.categoria.icone.replace('data:image;base64, ','');
            novoEstado.groupLayers[action.categoria.id] = {icone:icone,pontos:[]};

            pontos.map((ponto) => {
                ponto.pontosRelacionados = [];
                ponto.geometry = JSON.parse(ponto.geometry)
                novoEstado.groupLayers[action.categoria.id].pontos.push(ponto);

                return novoEstado;
            });
            */
            return {...state,pontos:[]};
        }
    }
}