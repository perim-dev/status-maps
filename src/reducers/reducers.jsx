import { combineReducers } from 'redux';
import arvoreDeAcervoReducer from '../componentes/lista-lateral/reducer';
import mapaReducer from '../componentes/mapa/reducer';
import buscaGeoReducer from '../componentes/buscageo/reducer';

const rootReducer = combineReducers({
    acervos: arvoreDeAcervoReducer,
    mapa: mapaReducer,
    buscaGeo: buscaGeoReducer
});

export default rootReducer;