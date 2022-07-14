import config from '../config';
/*

configuracoes: {

  acervos = [{}];
}

*/
class LocalData {
  
  login = localStorage.getItem(config.USER_KEY_LOGIN);  

  ler() {

    let userLocalData = localStorage.getItem(this.login);
    
    if(!userLocalData) 
      return { acervos:[]}
    
    return JSON.parse(userLocalData);
  }

  salvar(userLocalData) {
    
    localStorage.setItem(this.login, JSON.stringify(userLocalData));

  }

  clear() {
    localStorage.setItem(this.login, '[]');
  }
  
}

export default new LocalData();
