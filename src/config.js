const url_base = "localhost/status";
const config = {
    url:'http://'+url_base+'/api/v1',
    resources:{
        acervo:'/acervos',
        categoria:'/categorias',
        pontoDeInteresse:'/pontosDeInteresse'
    },
    websockets:{
        atualizacaoPontosPorCategoria:'ws://localhost:8080/status/atualizacaoDePontos'
    }
}

export default config;