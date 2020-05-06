const url_base = process.env.REACT_APP_API_URL|| process.env.NODE_ENV === "development" ? '192.168.10.110:3002/status':window.location.href.split('/')[2]+"/status";
console.log(process.env);

const config = {
    url:'http://'+url_base+'/api/v1',
    resources:{
        acervo:'/acervos',
        categoria:'/categorias',
        pontoDeInteresse:'/pontosDeInteresse',
        alarme:'/alarmes',
        credenciais: '/credenciais'
    },
    websockets:{
        atualizacaoPontosPorCategoria:'ws://'+url_base+'/atualizacaoDePontos'
    }
}

export default config;