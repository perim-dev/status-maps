const INITIAL_STATE = { lista: [] };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'ACERVO_LOAD':
            return { ...state, lista:action.payload.data}
        default:
            return state
    }
}