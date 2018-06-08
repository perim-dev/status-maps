
const INITIAL_STATE = {acervos:[]};

export default (state = INITIAL_STATE, action) => {
    var novoEstado;
    switch(action.type){
        case 'BUSCAR_PONTOS':{
            novoEstado = {...state,pontos:[]};

            let pontos = action.payload.data.slice();

            pontos.map((ponto) => {
                ponto.pontosRelacionados = [];
                ponto.geometry = JSON.parse(ponto.geometryAsGeoJSON);
                let icone = 'data:image;base64, '+ ponto.icone.replace('data:image;base64, ','');
                ponto.icone = icone;
                novoEstado.pontos.push(ponto);
                return ponto;
            });

            novoEstado.acervos.map((acervo) => {
               return acervo.pontos.map((p)=>{
                    return novoEstado.pontos.push(p);
                });
            });

            pontos = novoEstado.pontos.slice();

            novoEstado.pontos = pontos.filter((ponto, index, self) =>
                index === self.findIndex((p) => (
                    p.id === ponto.id
                ))
            );

            novoEstado.pontos.sort((a, b) => a.descricao.localeCompare(b.descricao));

            let group = novoEstado.pontos.reduce(function(r,p){
                r[p.acervoId] = r[p.acervoId] || {pontos:[],acervo:p.descricaoAcervo,visivel:true, id:p.acervoId};
                r[p.acervoId].pontos.push(p);
                return r;
            },[]);
            /* Removendo lixo deixado pela função anterior */
            group = group.filter((a)=> a !== undefined);
            group.sort((a,b)=> a.acervo.localeCompare(b.acervo));

            return {...state,acervos: group};
        }

        case 'MARCAR_DESMARCAR_FILTRO': {
            let newState = {...state};
            console.log("reducer marcandoDesmarcando",newState.acervos);
            newState.acervos.find(a =>{ 
                console.log(a)
                if(a){
                    return a.id === action.payload.acervoId
                } 
                return false;
            }).visivel = action.payload.marcado;
            
//            [action.payload.acervoId].visivel
            // newState.acervos[action.payload.acervoId].visivel = action.payload.marcado;
            return {...state, acervos:newState.acervos};
        }
        
        case 'LIMPAR_PONTOS':{
            return {...state,acervos:[]};
        }

        default : {
            return {...state};
        }
    }
}