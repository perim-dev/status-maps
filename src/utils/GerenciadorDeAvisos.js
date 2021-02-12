import config from '../config';
import moment from 'moment';

class GerenciadorDeAvisos {

  ler() {
    const _filtrarAvisos = (avisos) => {
      
      const agora = moment();
      
      const avisosFiltrados = avisos.filter( a => moment.duration(agora.diff(a.data)).asMinutes() < config.TEMPO_AVISO_MINUTOS);

      if(avisos.length !== avisosFiltrados.length){
        localStorage.setItem(config.CHAVE_AVISO, JSON.stringify(avisosFiltrados));
      }

      return avisosFiltrados;
    }

    let avisos = localStorage.getItem(config.CHAVE_AVISO);
    
    if(!avisos) return []
    
    return _filtrarAvisos(JSON.parse(avisos));
  }

  adicionar(aviso) {
    
    const hashCode = (s) => s.toString("base64");
    
    let avisos = this.ler() || [];
    
    aviso.data = new Date();
    
    avisos.splice(0, 0, aviso);
    
    aviso.id = hashCode(new Date() + aviso.titulo|| '123');

    localStorage.setItem(config.CHAVE_AVISO, JSON.stringify(avisos));
  }

  remover(id) {
    const avisos = this.ler().filter(a => a.id !== id)
    localStorage.setItem(config.CHAVE_AVISO, JSON.stringify(avisos));
  }

  clear() {
    localStorage.setItem(config.CHAVE_AVISO, '[]');
  }
  
}

export default new GerenciadorDeAvisos();
