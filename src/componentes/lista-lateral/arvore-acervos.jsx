import React,{Component} from 'react';
import {connect} from 'react-redux';
import {load, acervoChangeCheck, expandirComprimirCategorias} from './actions';
import {carregarPontosDaCategoria, removerPontosDaCategoria} from '../mapa/actions';
import { bindActionCreators } from 'redux';
import ItemCategoria from './item-categoria';
import '../../css/arvore-acervo.css';

class ArvoreAcervo extends Component {

    componentWillMount() {
        this.props.load();
    }

    renderRows() {
        const lista = this.props.lista || []
        return lista.map(acervo => (
            <div className="arvore-acervo-item" key={"acervo_"+acervo.id}> 
                
                <div className="expandir-comprimir" 
                     onClick={(e)=>this.props.expandirComprimirCategorias(acervo)}>
                        {acervo.aberto ? <i className="fa fa-minus"/> : <i className="fa fa-plus"/> }

                </div>
                
                <input  type="checkbox" 
                        checked={acervo.selecionado} 
                        onChange={(e) =>this.props.acervoChangeCheck(e,acervo)}
                        onClick={(e) =>this.selecionar(acervo,e)} 
                        name="acervo_{acervo.id}" 
                        id="{acervo.id}"/> 
                <div className="texto">{acervo.descricao} </div>
                {acervo.aberto && this.itensCategoria(acervo)}
            </div>
        ));
    }

    itensCategoria(acervo){
        if(acervo.categorias === undefined) {
            return ;
        }
        return acervo.categorias.map( categoria => (
            <ItemCategoria acervo={acervo} categoria={categoria} key={'item-categora'+categoria.id}/>
        ));
    }

    render() {
        return (
            <div>
                {this.renderRows()}
            </div>
        );
    }

    selecionar(acervo,event){
        if(event.target.checked){
            acervo.categorias.map((categoria)=>{
                this.props.carregarPontosDaCategoria(categoria); 
                return categoria;
            });
        } else {
            acervo.categorias.map((categoria)=>{
                this.props.removerPontosDaCategoria(categoria.id);
                return categoria;
            });
        }
    }
}

const mapStateToProps = state => ({lista: state.acervos.lista});
const mapDispatchToProps = dispatch => bindActionCreators({load, carregarPontosDaCategoria, removerPontosDaCategoria, acervoChangeCheck, expandirComprimirCategorias}, dispatch); 
export default connect(mapStateToProps, mapDispatchToProps)(ArvoreAcervo) ;

