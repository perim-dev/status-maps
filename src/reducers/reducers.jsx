import { combineReducers } from 'redux';
import arvoreDeAcervoReducer from '../componentes/lista-lateral/reducer';
import mapaReducer from '../componentes/mapa/reducer';
import buscaGeoReducer from '../componentes/buscageo/reducer';
import authReducer from '../auth/reducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    acervos: arvoreDeAcervoReducer,
    mapa: mapaReducer,
    buscaGeo: buscaGeoReducer,
    auth: authReducer,
    form: formReducer
});

export default rootReducer;