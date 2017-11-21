const INITIAL_STATE = { lista: [{id:2, descricao:"CETRio",categorias:[{id:3,descricao:'Acidentes'},{id:4,descricao:'Viaturas'}]},
                                {id:1, descricao:"Comlurb",categorias:[{id:1,descricao:'Compactadores'},{id:2,descricao:'Máquinas pesadas'}]}, 
                                {id:3, descricao:"Guarda Municipal",categorias:[{id:5,descricao:'Ocorrências'},{id:6,descricao:'Guardas Municipais'}]}] };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'ACERVO_LOAD':
            return { ...state, lista:action.payload.data}
        default:
            return state
    }
}