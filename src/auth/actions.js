import axios from 'axios';
import config from '../config';

export const login = async (credenciais) => {
    
    let crypt = new Buffer(credenciais.username+':'+credenciais.password).toString('base64');
    let auth = {'Authorization':'Basic '+ crypt};
    console.log("auth action",credenciais);
    console.log(auth);
    let resource = config.url + config.resources.credenciais;
    let request;
    try{
        request = await axios.get(`${resource}`,{headers: auth});
        console.log("request",request);
        return {
            type: 'AUTH_LOGIN',
            payload: request,
        };
    } catch(error){
        console.log("error",error);
    }

    return {type:'LOGIN_FAIL'}
    
}

export const logout = async (credenciais) => {
    return {
        type: 'AUTH_TOKEN_VALIDATED',
        payload: false
    }
}
