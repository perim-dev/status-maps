import React from 'react'
import { Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row } from 'react-bootstrap';


import Iframe from 'react-iframe';

import '../../css/leaflet.css';
import '../../css/leaflet-popup.css';
import '../../css/leaflet-icon.css';

import { adicionarCameraAoMosaico, limparPainel, carregarMosaicos, excluirCameraDoMosaico } from '../mosaico/action';
import CameraView from '../mosaico/CameraView';

class Marcador extends React.PureComponent {

  constructor(props) {
    super(props);
    this.popupRef = null;
    this.state = {
      atualizandoMaisInformacoes: false,
      mosaicos: [],
      show: false,
      onIncluir: false,
      dropDownIsOpen: false,
      mosaicoSelecionado: undefined,
    }
    this.cameraRef = null;
  }

  obterMaisInformacoesDoPonto = async (ponto) => {
    this.setState({ atualizandoMaisInformacoes: true });
    await this.props.carregarPontosRelacionados(ponto);
    await this.props.carregarAreaDeAtuacao(ponto);
    await this.props.carregarCamerasProximas(ponto);
    this.setState({ atualizandoMaisInformacoes: false });
  }

  validateMarkers = (p) => {

    //    const {map} = this.props;
    if (p.geometry.type !== 'Point') {
      return false;
    }
    return true;
    /*
    let latLngFilter = new LatLng(p.geometry.coordinates[1],p.geometry.coordinates[0]);
    
    return map.getBounds().contains(latLngFilter);*/
  }

  /*
     Eventos Mosaico 
  */


  adicionarCameraAoMosaico = (numeroCamera) => {

    const { mosaicoSelecionado } = this.state;

    try {
      mosaicoSelecionado.cameras.push(numeroCamera)
      adicionarCameraAoMosaico(mosaicoSelecionado).then(res => {
        this.carregarMosaicos()
      })
    } catch (error) {
      console.log(error);
    }
  }

  excluirCameraDoMosaico = (e) => {
    const body = { id: this.state.mosaicoSelecionado.id, camera: this.props.ponto.chaveExterna }
    try {
      excluirCameraDoMosaico(body).then(res => {
        this.carregarMosaicos()
      })
    } catch (error) {
      console.log(error);
    }

  }

  handleClick = (ponto) => {
    const { centralizar } = this.props;
    this.carregarMosaicos()
    centralizar(ponto, true)
  }

  handleSelectMosaico = (e) => {
    const value = e.target.value * 1;

    const mosaico = this.state.mosaicos.find(m => m.id === value);

    this.setState({ mosaicoSelecionado: mosaico });
  }

  isCameraNoMosaico = (mosaico) => {
    const { ponto } = this.props;
    const mosaicoCheck = mosaico || this.state.mosaicoSelecionado;
    return mosaicoCheck.cameras.find(c => c === ponto.chaveExterna) !== undefined
  }

  carregarMosaicos = () => {
    this.props.carregarMosaicos().then(response => {
      const { data = [] } = response.payload;

      this.setState({ mosaicos: data });
      if (this.state.mosaicoSelecionado) {

        const mosaico = data.find(m => m.id === this.state.mosaicoSelecionado.id);
        this.setState({ mosaicoSelecionado: mosaico });
      }
    })
  }

  render() {

    const { ponto, icone, centralizar } = this.props;
    const { mosaicos, mosaicoSelecionado } = this.state;

    //    console.log("renderizando pontos");

    return this.validateMarkers(ponto) && (
      <Marker onclick={() => this.handleClick(ponto)}
        position={[ponto.geometry.coordinates[1], ponto.geometry.coordinates[0]]}
        icon={icone} >

        <Popup
          className="status-popup"
          autoPan={false}>

          <div className="status-popup-conteudo" >
            <span className="descricao">{ponto.descricao} </span>

            {ponto.atributos && ponto.atributos.html && !ponto.atributos.isCamera &&
              <div className="status-popup-html" dangerouslySetInnerHTML={{ __html: ponto.atributos.html }} />
            }

            {ponto.atributos && ponto.atributos.html && ponto.atributos.isCamera &&
              <CameraView
                camera={ponto.chaveExterna}
                key={`camera-popup-${ponto.chaveExterna}`}
              />
            }

            {ponto.atributos && ponto.atributos.url && !ponto.atributos.isCamera &&
              <div>
                <Iframe url={ponto.atributos.url}
                  width="100%"
                  height="100%"
                  id="myId"
                  className="carrega-url"
                  display="initial"
                  position="relative" />
              </div>
            }

            {

              ponto.atributos && ponto.atributos.html &&
              <div className='mosaico-options-popup'>

                <select onChange={this.handleSelectMosaico} value={mosaicoSelecionado ? mosaicoSelecionado.id : ""} >
                  <option value=""  >
                    -- Mosaicos --
                  </option>
                  {mosaicos.map((m, k) =>

                    <option key={`mosaico-option-id-${m.id}`} value={m.id}  >
                      {m.descricao} {this.isCameraNoMosaico(m) ? "" : " (+)"}
                    </option>
                  )}

                </select>



                {mosaicoSelecionado && this.isCameraNoMosaico() &&
                  <div className='mosaico-btn-popup' onClick={this.excluirCameraDoMosaico}>
                    <i className="fa fa-trash"></i>
                  </div>
                }

                {mosaicoSelecionado && !this.isCameraNoMosaico() &&
                  <div className='mosaico-btn-popup' onClick={() => this.adicionarCameraAoMosaico(ponto.chaveExterna)}>
                    <i className="fa fa-plus"></i>
                  </div>
                }

              </div>
            }

            <hr />
            <span className="pontos-relacionados" >
              <div className="acao">
                <a onClick={(e) => this.obterMaisInformacoesDoPonto(ponto)} >Obter mais informações</a>
                {this.state.atualizandoMaisInformacoes && <img style={{ background: 'none', paddingLeft: '5px' }} src={require('../../img/loading.gif')} alt="logo" />}
              </div>
              <div id="camerasProximas" className="itens">
                {ponto.cameras && ponto.cameras.length > 0 && <div className="titulo-informacoes" title="teste">Câmeras próximas</div>}
                {ponto.cameras && ponto.cameras.map(c =>
                  <div key={`camera-proxima-key-${c.id}`} className="cameras-proximas" title={c.descricao}>
                    <div className="cameras-proximas-img" dangerouslySetInnerHTML={{ __html: c.atributos.html }} />
                    <div className="cameras-proximas-descricao">{c.chaveExterna}</div>
                  </div>
                )}
              </div>
              <div id="areasDeAtuacao" className="itens">
                {ponto.areasDeAtuacao && ponto.areasDeAtuacao.length > 0 && <div className="titulo-informacoes">Circunscrição</div>}
                {ponto.areasDeAtuacao && ponto.areasDeAtuacao.map((area, idx) =>
                  <div key={`area-de-atuacao-key-${idx}`} className="linha">
                    <Row>
                      <Col xs={7} sm={7} md={7} lg={7} className="coluna">
                        {area.categoria}
                      </Col>
                      <Col xs={3} sm={4} md={4} lg={4} className="coluna">
                        {area.descricao}
                      </Col>
                      <div className="row" ></div>
                    </Row>
                  </div>
                )}
              </div>
              <div id="pontosRelacionados" className="itens">
                {ponto.pontosRelacionados.length > 0 && <div className="titulo-informacoes">Pontos relacionados</div>}
                {ponto.pontosRelacionados.map((pontoRelacionado, idx) =>
                  <div key={`ponto-relacionado-${pontoRelacionado.id}`} className="linha">
                    <Row>
                      <Col xs={1} sm={1} md={1} lg={1} className="coluna">
                        <img src={`${pontoRelacionado.icone}`} alt="" onClick={(e) => centralizar(pontoRelacionado)} />
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7} className="coluna">
                        {pontoRelacionado.descricao}
                      </Col>
                      <Col xs={3} sm={4} md={4} lg={4} className="coluna">
                        {pontoRelacionado.distancia} (m)
                      </Col>
                      <div className="row" ></div>
                    </Row>
                  </div>
                )}
              </div>
            </span>
          </div>

        </Popup>
      </Marker>
    )
  }
}

const mapStateToProps = state => ({ expandido: state.expandido, mosaicos: state.mosaicos });
const mapDispatchToProps = dispatch => bindActionCreators({ adicionarCameraAoMosaico, limparPainel, carregarMosaicos }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Marcador);