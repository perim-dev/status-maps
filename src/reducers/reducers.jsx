import { combineReducers } from 'redux';
import arvoreDeAcervoReducer from '../componentes/lista-lateral/arvoreDeAcervoReducer';

const rootReducer = combineReducers({
    acervos: arvoreDeAcervoReducer
});

export default rootReducer;