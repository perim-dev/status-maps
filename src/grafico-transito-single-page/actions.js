import axios from 'axios';
import config from '../config';

export const login = async (credenciais) => {
    
    let crypt = new Buffer(credenciais.username+':'+credenciais.password).toString('base64');
    let auth = {'Authorization':'Basic '+ crypt};
    let resource = config.url + config.resources.credenciais;
    
    try{
        let request = await axios.get(`${resource}`,{headers: auth});
        return {
            type: 'AUTH_LOGIN',
            token: auth.Authorization,
            payload: request,
        };
    } catch(error){
        console.log("error",error);
    }

    return {type:'LOGIN_FAIL'}

}

export const logout = async (credenciais) => {
    return {
        type: 'AUTH_LOGOUT',
        token: null,
        payload: false
    }
}
