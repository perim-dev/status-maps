import React, { Component } from 'react';

import {Col, Panel} from 'react-bootstrap';

class Rodape extends Component {
  render() {
    return (
      <Col xs={12} sm={12} md={12} lg={12} className="rodape modulo">
        <Panel className="bg-grafite ">
          © Iplanrio - todos os direitos reservados
        </Panel>
      </Col>

    );
  }
}

export default Rodape;
