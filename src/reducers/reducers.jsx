import { combineReducers } from 'redux';
import arvoreDeAcervoReducer from '../componentes/lista-lateral/arvoreDeAcervoReducer';
import mapaReducer from '../componentes/mapa/mapaReducer';

const rootReducer = combineReducers({
    acervos: arvoreDeAcervoReducer,
    mapa: mapaReducer
});

export default rootReducer;