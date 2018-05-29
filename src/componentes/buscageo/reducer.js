
const INITIAL_STATE = {pontos:[],acervos:[]};

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
                novoEstado.acervos.push({acervo:ponto.descricaoAcervo,visivel:true});
                return ponto;
            });

            pontos = novoEstado.pontos.slice();

            novoEstado.pontos = pontos.filter((ponto, index, self) =>
                index === self.findIndex((p) => (
                    p.id === ponto.id
                ))
            );

            let acervos = novoEstado.acervos.slice();

            novoEstado.acervos = acervos.filter((acervo, index, self) =>
                index === self.findIndex((a) => (
                    a.acervo === acervo.acervo
                ))
            )

            novoEstado.pontos.sort((a, b) => a.descricao.localeCompare(b.descricao));
            

            return {...state,pontos:novoEstado.pontos, acervos:novoEstado.acervos};
        }
        
        case 'LIMPAR_PONTOS':{
            return {...state,pontos:[],acervos:[]};
        }

        default : {
            return {...state};
        }
    }
}