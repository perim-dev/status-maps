import React, { Component } from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { adicionarMosaico, carregarMosaicos, adicionarCameraAoMosaico } from "./action";

import "./select-mosaico.css";

import  { eliminaRepeticaoDoArrayDeCameras, extraiNumeroDaCameraDoHTML, verificaSeCameraJaFoiIncluinda } from '../../utils/functions.js';
import { ConfirmaDialog } from './ConfirmaDialog';


// DEPRECATED
class MosaicoSelect extends Component {
  constructor(props) {
    console.log("MOSAICO SELECT")
    super(props);
    this.hideButtons = false;
    this.state = {
      mosaicos: [],
      show: false,
      mosaicoInputText: "",
      mosaicoSelecionado: { descricao:'carregados (0)' },
      camerasDoPoligono: [],
      showDialog: false
    };
  }

  
  onIncluirCameraNoMosaicoClick = () => {
    this.setState((prevState) => ({
      ...prevState,
      onIncluir: !prevState.onIncluir,
    }));
  };

  onCarregaMosaicosClick = async (e) => {
      const resp = await this.props.carregarMosaicos();
      this.setState((prevState) => ({
        ...prevState,
        mosaicos: resp.payload.data,        
      }));
    
  };

  

  onSelecionaMosaicoChange = async (mosaicoSelecionado) => {    
    this.handleOpenDialog();
    this.setState((prevState) => ({
      ...prevState,
      mosaicoSelecionado
    }));
  };

  handleSalvaCamerasDoPoligono = () => {                   
    const camerasParaGravacao = eliminaRepeticaoDoArrayDeCameras(this.props.camerasDoPoligono).
    map(elem => extraiNumeroDaCameraDoHTML(elem));
      let mosaicoSelecionado = this.state.mosaicoSelecionado;  
      camerasParaGravacao.map(codigo => {              
        mosaicoSelecionado.cameras = verificaSeCameraJaFoiIncluinda(mosaicoSelecionado.cameras,codigo);               
        const data = this.props.adicionarCameraAoMosaico(mosaicoSelecionado)
        .then(async (respostaDoServidor) => {
            await respostaDoServidor.payload
            const mosaicos = await this.props.carregarMosaicos();
            this.setState(prevState => ({ ...prevState, mosaicos: mosaicos.payload.data }))          
        }).catch(error => {
          console.log('verifique o erro -> ',error);
        })
      }); 
     this.handleCloseDialog();
  }

  handleCloseDialog = () => {
    this.setState(prevState => ({
      ...prevState, showDialog: false,
      mosaicoSelecionado: { descricao:'carregados (0)' }
    }))
    this.handleClearMosaicos();   
  }

  handleOpenDialog = () => {    
    this.setState(prevState => ({
      ...prevState, showDialog: true
    }))
  }

  handleClearMosaicos = () => {
    this.setState(prevState => ({
      ...prevState, mosaicos:[]
    }));
  }
  
  render() {
    const { mosaicos } = this.state;     
    return (
      <div
        className="resultado-select"        
      >
        {!this.state.onIncluir && (
          <DropdownButton
            title={
              mosaicos &&
              mosaicos.length &&
              this.state.mosaicoSelecionado.descricao === "carregados (0)"
                ? `carregados ${mosaicos.length}`
                : this.state.mosaicoSelecionado.descricao
            }
            pullRight 
            bsStyle="default"            
            key="meu-menu-button"
            noCaret
            id="selectMosaicos"
            className="dropdown-color-button"
            onClick={this.onCarregaMosaicosClick}
          >
            <div className="dropdown-menu-item">
              {mosaicos &&
                mosaicos.map((mosaico, idx) => {
                  return (
                    <MenuItem
                      onSelect={() => this.onSelecionaMosaicoChange(mosaico)}
                      eventKey={idx}
                      key={idx}                      
                    >
                      {`${mosaico.descricao}`}
                   </MenuItem>
                  );
                })}
            </div>
          </DropdownButton>
        )}
        
        { this.state.showDialog && 
          <ConfirmaDialog 
            fechar={this.handleCloseDialog} 
            acao={this.handleSalvaCamerasDoPoligono}
            titulo="INCLUSAO DE CAMERAS NO MOSAICO"     
            top="-10%"            
            left="70%"        
          />
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ mosaicos: state.mosaicos });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ adicionarMosaico, carregarMosaicos, adicionarCameraAoMosaico }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MosaicoSelect);
