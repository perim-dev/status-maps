
const INITIAL_STATE = {geoJSON:{}};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'BUSCAR_ALARMES_DISPARADOS':{

            let alarmes = action.payload.data.slice();
            var alarmesGeojson = {"type": "FeatureCollection","features":[]};
            alarmes.map((alarme) => {
                alarme.geometry = JSON.parse(alarme.geometry);
                let geojson = {"type": "Feature","geometry":alarme.geometry,"properties": {"descricao":alarme.descricao,"motivo":alarme.motivo,"id":alarme.id}};
                alarmesGeojson.features.push(geojson);
                return alarme;
            });
            
            return {...state,geoJSON:alarmesGeojson};
        }
        
        case 'LIMPAR_ALARMES':{
            return {...state,geoJSON:{}};
        }

        default : {
            return state;
        }
    }
}