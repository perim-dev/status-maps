import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { adicionarMosaico, carregarMosaicos, excluirCameraDoMosaico, adicionarCameraAoMosaico } from './action';

import '../../css/avisos.css';
import '../../css/leaflet-popup.css';
import '../../css/mosaicos.css'
import CameraView from './CameraView';
import SelectMosaico from './SelectMosaico';

class PainelMosaico extends Component {

  constructor(props) {
    super(props);
    this.hideButtons = false;
    // TODO verificar state expandido
    this.state = {
      mosaicos: [],
      show: false,
      mosaicoInputText: '',
      mosaicoSelecionado: {},
      novoMosaico: { cameras: [] },
      fromBuscaGeo: false,
    }
    this.camerasRef = []
  }

  async componentDidMount() {
    console.log("componentDidMount")
    const data = await this.props.carregarMosaicos();
    this.setState(prevState => ({ ...prevState, mosaicos: data.payload.data }))
    if (this.props.fromBuscaGeo) {
      console.log(this.props.fromBuscaGeo)
      this.setState({ fromBuscaGeo: true, show: true })
      this.handleTeste()
      setTimeout(() => this.handleScroll(), 1000)
    }

    this.interval = setInterval(() => this.handleScroll(), 30000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }


  handleShow = () => {
    this.setState(prevState => ({ ...prevState, show: !prevState.show }));
  }

  handleCancelar = async () => {
    await this.limpar();

    this.setState({ show: false })
  }

  onNovoMosaicoClick = (e) => {
    this.setState(prevState => ({ ...prevState, mosaicoInputText: '' }));
    this.handleShow();
  }

  handleExcluirCameraDoMosaico = async (camera) => {

    if (this.state.fromBuscaGeo) {

      const id = this.state.novoMosaico.cameras.indexOf(camera)

      if (id >= 0) {

        const camRef = this.camerasRef.filter(c => c && c.id === camera);

        if (camRef.length > 0) {
          console.log(camRef)
          camRef.map(c => c.inactivate());
        }
        setTimeout(() => {

          const nm = { ...this.state.novoMosaico };
          nm.cameras = this.state.novoMosaico.cameras.filter(c => c !== camera)
          this.setState({ novoMosaico: nm })
        }, 200)
      }

    } else {

      const { id } = this.state.mosaicoSelecionado;
      await this.props.excluirCameraDoMosaico({ id, camera });
      const mosaicosData = await this.props.carregarMosaicos();
      this.setState(prevState => ({ ...prevState, mosaicos: mosaicosData.payload.data }))
    }
  }

  onSalvarMosaicoClick = async (descricao) => {
    this.handleShow();
    const result = await this.props.adicionarMosaico({ descricao })

    if (this.state.fromBuscaGeo) {
      console.log(result.payload, result.payload.data)
      const mosaico = { ...result.payload.data }
      console.log("mosaico", mosaico)
      mosaico.cameras = this.state.novoMosaico.cameras;
      this.props.adicionarCameraAoMosaico(mosaico)
      this.limpar();
      this.setState({ mosaicoSelecionado: mosaico, fromBuscaGeo: false });
      this.handleScroll();
    }

    const mosaicosData = await this.props.carregarMosaicos();
    this.setState(prevState => ({ ...prevState, mosaicos: mosaicosData.payload.data }))
  }

  onMosaicoSelecionadoClick = (m) => {
    this.setState(prevState => ({
      ...prevState, mosaicoSelecionado: m
    }))
    setTimeout(() => {

      this.handleScroll()
    }, 500);

  }

  handleTeste = (e) => {

    const cameras = this.props.buscaGeo.acervos.map(acervo => acervo.pontos.filter(ponto => ponto.camera === true)).reduce((a, b) => a.concat(b)).map(p => p.chaveExterna)

    this.setState({ novoMosaico: { cameras } })
  }

  limpar = (e) => {
    console.log(this.camerasRef)
    this.camerasRef.filter(c => c != null).map(c => c.inactivate())

    if (this.state.fromBuscaGeo && this.props.buscaGeo && this.props.buscaGeo.acervos.length > 0) {
      setTimeout(() => this.setState({ novoMosaico: { cameras: [] } }), 200)
    }

  }

  handleFecharModal = () => {
    this.limpar();
    setTimeout(() => this.props.fechar(), 500)
  }

  handleScroll = () => {
    console.log("handle scroll")
    this.camerasRef.filter(c => c != null).map(c => c.checkToShow())
  }

  render() {
    const { mosaicos, novoMosaico, fromBuscaGeo, mosaicoSelecionado } = this.state
    return (

      <div className="div-mosaicos-content">
        <div className='div-body-mosaico' onScroll={this.handleScroll}>
          <SelectMosaico
            handleCancelar={this.handleCancelar}
            show={this.state.show}
            mosaicos={mosaicos}
            onMosaicoSelecionadoClick={this.onMosaicoSelecionadoClick}
            onNovoMosaicoClick={this.onNovoMosaicoClick}
            mosaicoSelecionado={mosaicoSelecionado}
            onSalvarMosaicoClick={this.onSalvarMosaicoClick}
          />

          <div className='grid-layout-container-5'>
            { // Câmeras do mosaico selecionado
              mosaicoSelecionado.id && (
                mosaicoSelecionado.cameras.map((camera, i) =>
                  <CameraView ref={ref => this.camerasRef.push(ref)} lazy={true} camera={camera} key={`${camera}-${i}`} excluirCameraDoMosaico={this.handleExcluirCameraDoMosaico} />
                )
              )
            }

            { // Câmeras da buscaGeo
              fromBuscaGeo && novoMosaico.cameras.length > 0 && novoMosaico.cameras.map((camera, i) =>
                <CameraView ref={ref => this.camerasRef.push(ref)} lazy={true} camera={camera} key={camera} excluirCameraDoMosaico={this.handleExcluirCameraDoMosaico} />
              )
            }
          </div>

          {
            !this.hideButtons && (
              <div >
                <div title="fechar" className='mosaico-fechar' onClick={this.handleFecharModal}>
                  <i className="fa fa-close" style={{ color: '#f33939' }}></i>
                </div>
              </div>
            )
          }
        </div>
      </div>

    );
  }
}
const mapStateToProps = state => ({ mosaicos: state.mosaicos, buscaGeo: state.buscaGeo });
const mapDispatchToProps = dispatch => bindActionCreators({ adicionarMosaico, carregarMosaicos, excluirCameraDoMosaico, adicionarCameraAoMosaico }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PainelMosaico);
