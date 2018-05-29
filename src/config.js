const url_base = window.location.href.split('/')[2]+"/status";

const config = {
    url:'http://'+url_base+'/api/v1',
    resources:{
        acervo:'/acervos',
        categoria:'/categorias',
        pontoDeInteresse:'/pontosDeInteresse',
        credenciais: '/credenciais'
    },
    websockets:{
        atualizacaoPontosPorCategoria:'ws://'+url_base+'/atualizacaoDePontos'
    }
}

export default config;