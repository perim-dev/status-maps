import { stopAsyncValidation, actionTypes } from "redux-form";

const INITIAL_STATE = {data:[]};
const DATA_FAKE = '2020-01-01';
export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'BUSCAR_DADOS_GRAFICO_TRANSITO':{
            console.log(action.payload.data, action.headerArray);
            const { data } = action.payload;
            let newData = [];
            newData.push(action.headerArray);
            data.map((dado) => newData.push([new Date(`${DATA_FAKE} ${dado[0]}`),dado[1], dado[2], dado[3]]));
            console.log(newData);
            return {...state, data: newData}
        }

        default : {
            return {...state};
        }
    }
}