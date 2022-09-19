import React, { Component } from "react";
import { DropdownButton, MenuItem, Button, Row, Col } from 'react-bootstrap';

import '../../css/mosaico-select.css';

class SelectMosaico extends Component {

  constructor(props) {
    super(props);
    this.state = { mosaicoInputText: "" }
  }

  onInputChange = (e) => {
    this.setState(prevState => ({
      ...prevState, [e.name]: e.value
    }));
  }

  render() {

    const {
      handleCancelar,
      show,
      mosaicos,
      onMosaicoSelecionadoClick,
      onNovoMosaicoClick,
      mosaicoSelecionado,
      onSalvarMosaicoClick
    } = this.props;

    return (
      <div className="select-mosaico-body">
        <Row className="justify-content-md-center" style={{ marginLeft: 0, marginRight: 0 }}>
          <Col>
            {
              show && (
                <Button
                  bsStyle="link"
                  className="button-cancelar-mosaicos input-mosaico"
                  onClick={handleCancelar}
                >
                  Cancelar
                </Button>)
            }
          </Col>
          <Col>
            {
              !show && (<DropdownButton
                title={mosaicoSelecionado.descricao || "Selecione um mosaico"}
                bsStyle='link'
                key='meu-menu-button'
                noCaret
                id="itemSelecionado"
                name='mosaicoSelecionado'
                className="dropdown-escolha-mosaicos input-mosaico"
              >
                <div className="div-container-menuitem" >
                  {console.log("mosaicos", mosaicos)}
                  {
                    mosaicos ? mosaicos.map((mosaico, idx) => {
                      return <MenuItem className="dropdown-menuitem-escolha-mosaicos " onSelect={(e) => onMosaicoSelecionadoClick(mosaico)} eventKey={`${mosaico.id}`} key={`${idx}`}>{`${mosaico.descricao}`}</MenuItem>
                    }) : ''
                  }
                </div>
              </DropdownButton>
              )
            }
          </Col>
          <Col>
            {

              show && (
                <input type="text"
                  value={this.state.mosaicoInputText}
                  name="mosaicoInputText"
                  maxLength="30"
                  className="input-text-mosaicos"
                  onChange={(e) => this.onInputChange(e.target)}
                />)
            }

            {
              !show && (<Button
                name="novo"
                bsStyle='link'
                className="button-novo-mosaicos input-mosaico"
                onClick={onNovoMosaicoClick}
              >
                <i className="fa fa-plus"/>
              </Button>)

            }
          </Col>
          <Col>
            {

              show && (<Button
                name="salvar"
                bsStyle='link'
                className="button-salvar-mosaicos input-mosaico"
                onClick={() => onSalvarMosaicoClick(this.state.mosaicoInputText)}
              >
                Salvar
              </Button>)
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default SelectMosaico;
