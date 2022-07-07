const protocol = window.location.protocol.replace(':','');
const wssProtocol = protocol ==='https'?'wss':'ws';

const WSS_HOM = 'ws://34.117.174.108/status-websocket/atualizacaoDePontos';
const URL_BASE = process.env.REACT_APP_API_URL|| process.env.NODE_ENV === "development" ? '192.168.10.112:5001':window.location.href.split('/')[2];
const WSS_BASE = process.env.NODE_ENV === "development" ? WSS_HOM :`${wssProtocol}://`+URL_BASE+'/status-websocket/atualizacaoDePontos';



const config = {
    url:`${protocol}://`+URL_BASE+'/status/api/v1',
    resources:{
        acervo:'/acervos',
        categoria:'/categorias',
        pontoDeInteresse:'/pontosDeInteresse',
        alarme:'/alarmes',
        credenciais: '/credenciais',
        graficoTransito: '/graficos/transito',
        graficoEngarrafamento: '/transito/engarrafamento'
    },
    apiEstagioAtencao:`${protocol}://aplicativo.cocr.com.br/estagio_api`,
    websockets:{
        atualizacaoPontosPorCategoria: WSS_BASE
    },
    URL_CAMERA_CET: `${protocol}://`+URL_BASE+'/camera/?cam=9',
    CHAVE_AVISO: '@STATUS-CAHVE-AVISO',
    TEMPO_AVISO_MINUTOS: 60,
    URL_COMANDO: `${protocol}://${URL_BASE}-comando/api/v2`
}

export default config;