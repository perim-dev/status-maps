const url_base = process.env.REACT_APP_API_URL|| process.env.NODE_ENV === "development" ? 'localhost:5001/status':window.location.href.split('/')[2]+"/status";

const config = {
    url:'http://'+url_base+'/api/v1',
    resources:{
        acervo:'/acervos',
        categoria:'/categorias',
        pontoDeInteresse:'/pontosDeInteresse',
        alarme:'/alarmes',
        credenciais: '/credenciais',
        graficoTransito: '/graficos/transito',
        graficoEngarrafamento: '/transito/engarrafamento'
    },
    apiEstagioAtencao:'http://aplicativo.cocr.com.br/estagio_api',
    websockets:{
        atualizacaoPontosPorCategoria:'ws://'+url_base+'/atualizacaoDePontos'
    }
}

export default config;