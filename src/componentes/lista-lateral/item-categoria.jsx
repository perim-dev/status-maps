import React,{Component} from 'react';
import {connect} from 'react-redux';
import {carregarPontosDaCategoria, removerPontosDaCategoria} from '../mapa/actions';
import {categoriaChangeCheck} from './actions';

import { bindActionCreators } from 'redux';

import '../../css/arvore-acervo.css';

class ItemCategoria extends Component {
   
    render() {
        const categoria = this.props.categoria || {};
        const acervo = this.props.acervo || {};
        return (
            <div className="arvore-categoria-item" key={"categoriaid_"+categoria.id}>
                <input  type="checkbox" 
                        checked={categoria.selecionado} 
                        onClick={(e) =>this.selecionar(categoria,e)} 
                        name={"categoria_input"+categoria.id} 
                        onChange={(e) =>this.props.categoriaChangeCheck(e,acervo,categoria)}
                        id={"categoria_input_"+categoria.id}/> {categoria.descricao}
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

const mapStateToProps = state => ({lista: state.acervos.lista});
const mapDispatchToProps = dispatch => bindActionCreators({carregarPontosDaCategoria, removerPontosDaCategoria, categoriaChangeCheck}, dispatch); 
export default connect(mapStateToProps,mapDispatchToProps)(ItemCategoria) ;

