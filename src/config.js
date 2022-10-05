const protocol = window.location.protocol.replace(':', '');
const wssProtocol = protocol === 'https' ? 'wss' : 'ws';

const WSS_HOM = 'ws://34.117.174.108/status-websocket/atualizacaoDePontos';
// const WSS_HOM = 'ws://192.168.1.14:9000/status-websocket/atualizacaoDePontos';
const URL_BASE = process.env.REACT_APP_API_URL || process.env.NODE_ENV === "development" ? 'localhost:5001' : window.location.href.split('/')[2];
const WSS_BASE = process.env.NODE_ENV === "development" ? WSS_HOM : `${wssProtocol}://` + URL_BASE + '/status-websocket/atualizacaoDePontos';



const config = {
    url: `${protocol}://` + URL_BASE + '/status/api/v1',
    resources: {
        acervo: '/acervos',
        categoria: '/categorias',
        pontoDeInteresse: '/pontosDeInteresse',
        alarme: '/alarmes',
        credenciais: '/credenciais',
        graficoTransito: '/graficos/transito',
        graficoEngarrafamento: '/transito/engarrafamento',
        mosaico: '/mosaicos'
    },
    apiEstagioAtencao: `${protocol}://aplicativo.cocr.com.br/estagio_api`,
    websockets: {
        atualizacaoPontosPorCategoria: WSS_BASE
    },

    URL_CAMERA_CET_old: `${protocol}://aplicativo.cocr.com.br/camera/`,
    URL_CAMERA_CET: 'http://cam#NUMCAM#.cameras.status.rio:9004/?CODE=',
    URL_CAMERA_CET2: `${protocol}://local.status.rio:5001/camera/?cam=`,
    CHAVE_AVISO: '@STATUS-CAHVE-AVISO',
    USER_KEY_TOKEN: '_status_user_token',
    USER_KEY_LOGIN: '_status_user_login',
    TEMPO_AVISO_MINUTOS: 60,
    URL_COMANDO: `
    $ { protocol }: //${URL_BASE}-comando/api/v2`
}

export default config;

// URL_CAMERA_CET: `${protocol}://` + URL_BASE + '/camera/?cam=',