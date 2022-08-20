//função para extração do número da câmera da tag html
export function extraiNumeroDaCameraDoHTML(url) {
    console.log(url)
    const regExp = /\bcam=\w+\b'/g;
    const array = regExp.exec(url);
    const elem = array[0];

    const posIni = elem.indexOf("=");
    const posFim = elem.indexOf("'");
    return elem.substring(posIni + 1, posFim);
}

export function verificaSeCameraJaFoiIncluinda(cameras, codigoDaCameraParaInclusao) {
    return cameras.join().includes(codigoDaCameraParaInclusao) ?
        cameras : [...cameras, codigoDaCameraParaInclusao];
}

//eliminando duplicatas de câmeras
export function eliminaRepeticaoDoArrayDeCameras(camerasDoPoligono) {
    const array = camerasDoPoligono;
    const semRepeticao = array.filter((elem, index, self) => {
        return index === self.indexOf(elem);
    });
    return semRepeticao;
}