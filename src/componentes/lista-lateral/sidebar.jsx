import React from 'react';
import  { Button, Modal, Col} from 'react-bootstrap';
import ArvoreAcervo from './arvore-acervos';

import '../../css/sidebar.css';

class Sidebar extends React.Component {
	render() {
  	return (
    	<Modal className='Sidebar left' show={ this.props.isVisible } onHide={this.props.onHide} 
      	 autoFocus keyboard
      >
      	<Modal.Header closeButton>
        	<Modal.Title>Acervos</Modal.Title>
        </Modal.Header>
      	<Modal.Body>
          <ArvoreAcervo />
        </Modal.Body>
      </Modal>
    );
  }
}

export class SidebarDemo extends React.Component {
	constructor(props, context) {
  	super(props, context);
    
  	this.state = {
      isVisible: false,
    };
  }
  
  updateModal(isVisible) {
    //this.state.isVisible = isVisible;
    this.setState ( {...this.state, 'isVisible':isVisible});
    this.forceUpdate();
  }
  
	render() {
  	return (
    	<Col xs={12} smHidden={true} mdHidden={true} lgHidden={true} className='Sidebar-demo '>
    
      	<Button onClick={ () => this.updateModal(true) }><i className="fa fa-bars"></i></Button>
        <Sidebar side='left' isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false) }>
        	
        </Sidebar>
      </Col>
    );
  }
}
