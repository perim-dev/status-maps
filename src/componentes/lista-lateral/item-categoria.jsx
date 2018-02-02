import React,{Component} from 'react';
import {connect} from 'react-redux';
import {carregarPontosDaCategoria, removerPontosDaCategoria} from '../mapa/actions';
import { bindActionCreators } from 'redux';

import '../../css/arvore-acervo.css';

class ItemCategoria extends Component {
   
  
/*
    componentWillReceiveProps(){
    }
*/
    render() {
        const categoria = this.props.categoria || {}
        return (
            <div className="arvore-categoria-item" key={"categoriaid_"+categoria.id}>
                <input type="checkbox" onClick={(e) =>this.selecionar(categoria,e)} name={"categoria_input"+categoria.id} id={"categoria_input_"+categoria.id}/> {categoria.descricao}
            </div>
        );
    }

    selecionar(categoria,event){
        if(event.target.checked){
            this.props.carregarPontosDaCategoria(categoria);
        } else {
            this.props.removerPontosDaCategoria(categoria.id);
        }

        
    }

}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({carregarPontosDaCategoria, removerPontosDaCategoria}, dispatch); 
export default connect(mapStateToProps,mapDispatchToProps)(ItemCategoria) ;

