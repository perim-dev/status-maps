import { combineReducers } from 'redux';
import arvoreDeAcervoReducer from '../componentes/lista-lateral/reducer';
import mapaReducer from '../componentes/mapa/reducer';

const rootReducer = combineReducers({
    acervos: arvoreDeAcervoReducer,
    mapa: mapaReducer
});

export default rootReducer;