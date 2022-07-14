import React,{Component} from 'react';
import {connect} from 'react-redux';
import {load, acervoChangeCheck, expandirComprimirCategorias, agruparDesagruparAcervo} from './actions';
import {carregarPontosDaCategoria, removerPontosDaCategoria, agruparDesagruparCategoria} from '../mapa/actions';
import { bindActionCreators } from 'redux';
import ItemCategoria from './item-categoria';
import '../../css/arvore-acervo.css';

class ArvoreAcervo extends Component {

    constructor(props){
        super(props);
        if(this.props.controleRemotoSocket){
            this.controleRemotoSocket = this.props.controleRemotoSocket;

            this.controleRemotoSocket.on('mapa-controle', controle => {
                if(controle.tipo === 'selecionar-acervo'){
                    const acervoSelecionado = this.props.lista.filter( a => a.id === controle.valor * 1);
                    acervoSelecionado.length > 0 && acervoSelecionado[0].ref.click();
                }
                
            });
        }
    }

    componentWillMount() {
        this.props.load();
    }

    renderRows() {
        const lista = this.props.lista || [];

        lista.map((a) => a.ref = null);
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
                        name={`acervo_${acervo.id}`} 
                        ref={(ref) => acervo.ref = ref }
                        id={`${acervo.id}`}/> 
                <div className="texto">{acervo.descricao} <span className="agrupar-desagrupar" title="Agrupar / Desagrupar pontos" onClick={() => this.handleAgruparDesagrupar(acervo)}><i className={`fa ${acervo.agrupado ? 'fa-expand':'fa-compress'}`}></i></span> </div>
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

    handleAgruparDesagrupar(acervo) {
        this.props.agruparDesagruparAcervo(acervo);
        if(acervo.selecionado){
            acervo.categorias.map((categoria)=>{
                categoria.agrupado = acervo.agrupado;
                this.props.agruparDesagruparCategoria(categoria);
                return categoria;
            });
        }

    }

    selecionar(acervo,event){
        if(event.target.checked){
            acervo.categorias.map((categoria)=>{
                categoria.agrupado = acervo.agrupado;
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
const mapDispatchToProps = dispatch => bindActionCreators({load, carregarPontosDaCategoria, removerPontosDaCategoria, acervoChangeCheck, expandirComprimirCategorias, agruparDesagruparAcervo, agruparDesagruparCategoria}, dispatch); 
export default connect(mapStateToProps, mapDispatchToProps)(ArvoreAcervo) ;

