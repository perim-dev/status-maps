import LocalData from "./LocalData";

class UserLocalData {
  acervos = []
  
  constructor() {
    const localData = LocalData.ler();
    this.acervos = localData.acervos || [];
  }

  getAcervoLocalDataById (acervoId) {

    let acervosLocalData = this.acervos.filter(a => a.id === acervoId);
    return acervosLocalData.length > 0 ? acervosLocalData[0]:null;

  }

  addAcervo ({id, agrupado = true}) {
    
    this.acervos.push({id, agrupado});

  }

  salvar() {
    const configuracao = {acervos: this.acervos}
    LocalData.salvar(configuracao);
  }
}

export default UserLocalData;
