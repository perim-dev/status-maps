const userKey = '_status_user';

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem(userKey)),
    validToken: false,
    messageError:null
}

export default (state = INITIAL_STATE, action) => {
    
    switch(action.type){
        case 'AUTH_TOKEN_VALIDATED':{
            if(action.payload){
                return {...state, validToken:true}
            } else {
                return {...state, validToken: false, user: null}
            }
        }
        case 'AUTH_LOGIN':{
            localStorage.setItem(userKey,JSON.stringify(action.payload))
            return {...state, validToken:true};
        }
        case 'LOGIN_FAIL':{
            return {...state, validToken:false,messageError:"Falha de autenticação"};
        }
        default:
            return state
    }
}