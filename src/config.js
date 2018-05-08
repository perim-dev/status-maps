const url_base = "10.5.225.180/status";
const config = {
    url:'http://'+url_base+'/api/v1',
    resources:{
        acervo:'/acervos',
        categoria:'/categorias',
        pontoDeInteresse:'/pontosDeInteresse'
    },
    websockets:{
        atualizacaoPontosPorCategoria:'ws://'+url_base+'/atualizacaoDePontos'
    }
}

export default config;