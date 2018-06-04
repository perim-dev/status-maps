const userKey = '_status_user';

const INITIAL_STATE = {
    token:localStorage.getItem(userKey),
    validToken: true,
    messageError:null
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case 'AUTH_TOKEN_VALIDATED':{
            if(action.payload){
                return {...state, validToken:true}
            } else {
                return {...state, validToken: false, token: null}
            }
        }
        case 'AUTH_LOGIN':{
            console.log(action.payload);
            localStorage.setItem(userKey,action.token)
            return {...state, validToken:true,token:action.token};
        }
        case 'LOGIN_FAIL':{
            return {...state, validToken:false,token:null,messageError:"Falha de autenticação"};
        }
        case 'AUTH_LOGOUT':{
            localStorage.removeItem(userKey);
            return {...state, validToken:false,token:null,messageError:""};
        }
        default:
            return state
    }
}