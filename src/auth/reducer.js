import config from "../config";
const userToken = config.USER_KEY_TOKEN;
const userLogin = config.USER_KEY_LOGIN;

const INITIAL_STATE = {
    token: localStorage.getItem(userToken),
    validToken: true,
    messageError: null
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'AUTH_TOKEN_VALIDATED': {
            if (action.payload) {
                return { ...state, validToken: true }
            } else {
                return { ...state, validToken: false, token: null }
            }
        }
        case 'AUTH_LOGIN': {
            console.log(action);
            localStorage.setItem(userToken, action.token)
            localStorage.setItem(userLogin, action.username)
            return { ...state, validToken: true, token: action.token };
        }
        case 'LOGIN_FAIL': {
            return { ...state, validToken: false, token: null, messageError: "Falha de autenticação" };
        }
        case 'AUTH_LOGOUT': {
            localStorage.removeItem(userToken);
            return { ...state, validToken: false, token: null, messageError: "" };
        }
        default:
            return state
    }
}