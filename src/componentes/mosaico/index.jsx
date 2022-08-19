import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { adicionarMosaico, carregarMosaicos, excluirCameraDoMosaico } from './action';
import { DropdownButton, MenuItem, Button, Row, Col } from 'react-bootstrap';

import config from "../../config";

import '../../css/avisos.css';
import '../../css/leaflet-popup.css';
import '../../css/mosaicos.css'


const enums = { escolhaUmMosaico: 'Escolha um mosaico' }

class PainelMosaico extends Component {

  constructor(props) {
    super(props);
    this.hideButtons = false;
    this.state = {
      expandido: true,
      mosaicos: [],
      show: false,
      mosaicoInputText: '',
      mosaicoSelecionado: { id: 0, descricao: enums.escolhaUmMosaico }


    }
  }


  async componentDidMount() {
    const data = await this.props.carregarMosaicos();
    console.log(data)
    this.setState(prevState => ({ ...prevState, mosaicos: data.payload.data }))
  }

  alternarTamanhos = () => {
    this.setState({ expandido: !this.state.expandido })
  }


  handleShow = () => {
    this.setState(prevState => ({ ...prevState, show: !prevState.show }));
  }

  onNovoMosaicoClick = (e) => {
    this.setState(prevState => ({ ...prevState, mosaicoInputText: '' }));
    this.handleShow();
  }

  handleExcluirCameraDoMosaico = async (camera) => {
    const { id } = this.state.mosaicoSelecionado;
    await this.props.excluirCameraDoMosaico({ id, camera });
    const mosaicosData = await this.props.carregarMosaicos();
    this.setState(prevState => ({ ...prevState, mosaicos: mosaicosData.payload.data }))
  }

  onSalvarMosaicoClick = async (e) => {
    this.handleShow();
    await this.props.adicionarMosaico({ descricao: this.state.mosaicoInputText })
    const mosaicosData = await this.props.carregarMosaicos();
    this.setState(prevState => ({ ...prevState, mosaicos: mosaicosData.payload.data }))
  }

  onMosaicoSelecionadoClick = (m) => {
    this.setState(prevState => ({
      ...prevState, mosaicoSelecionado: { id: m.id, descricao: m.descricao }
    }))
  }

  onInputChange = (e) => {
    this.setState(prevState => ({
      ...prevState, [e.name]: e.value
    }));
  }


  render() {
    const { expandido, mosaicos } = this.state
    return (

      <div className={`avisos ${expandido ? ' expandido' : ' normal'}`}>
        <div className='div-body-mosaico'>
          <div className="div-titulo-painel-mosaicos">
            Mosaicos
          </div>
          <div style={{ textAlign: 'center', boxSizing:"border-box" }}>
            <Row className="justify-content-md-center" style={{ marginLeft:0, marginRight:0 }}>
              <Col>
                {
                  this.state.show && (<Button
                    bsStyle="link"
                    className="button-cancelar-mosaicos"
                    onClick={this.handleShow}
                  >
                    Cancelar
                  </Button>)
                }
              </Col>
              <Col>
                {
                  !this.state.show && (<DropdownButton
                    title={this.state.mosaicoSelecionado.descricao}
                    bsStyle='link'
                    key='meu-menu-button'
                    noCaret
                    id="itemSelecionado"
                    name='mosaicoSelecionado'
                    className="dropdown-escolha-mosaicos"
                  >
                    <div className="div-container-menuitem" >
                      {console.log("mosaicos", mosaicos)}
                      {
                        mosaicos ? mosaicos.map((mosaico, idx) => {
                          return <MenuItem className="dropdown-menuitem-escolha-mosaicos" onSelect={(e) => this.onMosaicoSelecionadoClick(mosaico)} eventKey={`${mosaico.id}`} key={`${idx}`}>{`${mosaico.descricao}`}</MenuItem>
                        }) : ''
                      }
                    </div>
                  </DropdownButton>
                  )
                }
              </Col>
              <Col>
                {

                  this.state.show && (
                    <input type="text"
                      value={this.state.mosaicoInputText}
                      name="mosaicoInputText"
                      maxLength="30"
                      className="input-text-mosaicos"
                      onChange={(e) => this.onInputChange(e.target)}

                    />)

                }

                {
                  !this.state.show && (<Button
                    name="novo"
                    bsStyle='link'
                    className="button-novo-mosaicos"
                    onClick={this.onNovoMosaicoClick}
                  >
                    Novo
                  </Button>)

                }
              </Col>
              <Col>
                {

                  this.state.show && (<Button
                    name="salvar"
                    bsStyle='link'
                    className="button-salvar-mosaicos"
                    onClick={this.onSalvarMosaicoClick}
                  >
                    Salvar
                  </Button>)
                }
              </Col>
            </Row>
          </div>
          <div className='grid-layout-container-5'>
            {
              mosaicos && this.state.mosaicoSelecionado.descricao !== enums.escolhaUmMosaico && (
                mosaicos.find(mosaico => {
                  return mosaico.descricao === this.state.mosaicoSelecionado.descricao;
                }).cameras.map((camera, i) =>
                  <div key={i} className="div-container-camera-body" >
                    <div className="div-container-img-fechar">
                      <span className="span-img-label" title="Excluir" onClick={(e) => this.handleExcluirCameraDoMosaico(camera)}>x</span>
                      <div
                        className="div-container-img-html "
                        dangerouslySetInnerHTML={{ __html: `<img src='${config.URL_CAMERA_CET}${camera}' width='320' height='250'/>` }}
                      />
                    </div>
                  </div>
                )
              )
            }
          </div>

          {
            !this.hideButtons && (
              <div >
                <div title="fechar" className='avisos-botao-expandir-mosaicos' onClick={(e) => this.props.fechar()}>
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
const mapStateToProps = state => ({ mosaicos: state.mosaicos });
const mapDispatchToProps = dispatch => bindActionCreators({ adicionarMosaico, carregarMosaicos, excluirCameraDoMosaico }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PainelMosaico);
