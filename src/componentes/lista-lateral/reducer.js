const INITIAL_STATE = { lista: [] };

export default (state = INITIAL_STATE, action) => {
    let novaLista;
    let acervo_id;
    switch(action.type){
        case 'ACERVO_LOAD':
            let lista = action.payload.data.slice();
            /* 
               Inicialmente fixando os itens selecionados como falso, 
              porém no futuro, esse valor pode vir da API
            */
            
            if(state === INITIAL_STATE){
                console.log("obtendo nova lista de acervos;")
                lista.map((acervo)=> {
                    acervo.selecionado = false;
                    acervo.aberto = true;
                    acervo.categorias.map((categoria)=>{
                        categoria.selecionado = false;
                        return categoria;
                    });
                    return acervo;
                });
                return { ...state, lista:lista};
            }
            
            return state;

        case 'CATEGORIA_CHANGE_CHECK':
            let checked = action.payload;
            acervo_id = action.acervo_id;
            let categoria_id = action.categoria_id;
            novaLista = state.lista.slice();
            novaLista.map((acervo)=>{
                if(acervo.id === acervo_id){
                    acervo.categorias.map((categoria) => {
                        if(categoria.id === categoria_id ){
                            categoria.selecionado = checked;
                        }
                        return categoria;
                    });
                }
                return acervo;
            });

            return {...state, lista:novaLista};

        case 'ACERVO_CHANGE_CHECK':
            let acervoChecked = action.payload;
            let id = action.acervo_id;
            let novaListaAcervo = state.lista.slice();
            novaListaAcervo.map((acervo)=>{
                if(acervo.id === id){
                    acervo.selecionado = acervoChecked;
                    acervo.categorias.map((categoria) => {
                        categoria.selecionado = acervoChecked;
                        return categoria;
                    });
                }
                return acervo;
            });

            return {...state, lista:novaListaAcervo};

        case 'EXPANDIR_COMPRIMIR_CATEGORIAS':
            acervo_id = action.acervo_id;
            novaListaAcervo = state.lista.slice();
            novaListaAcervo.map((acervo)=>{
                console.log(acervo.id,acervo_id);
                if(acervo.id === acervo_id){
                    console.log(acervo.aberto);
                    acervo.aberto = !acervo.aberto;
                    
                }
                return acervo;
            });

            return {...state, lista:novaListaAcervo};

        default:
            return state
    }
}