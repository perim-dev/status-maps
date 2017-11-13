import React,{Component} from 'react';
import {connect} from 'react-redux';
import {load} from './actions';
import { bindActionCreators } from 'redux';
import '../../css/arvore-acervo.css';

class ArvoreAcervo extends Component {
    
    constructor(props) {
        super(props);
        console.log('iniciou');
    }

    componentWillMount() {
        
        this.props.load();
        console.log('componentWillMount',this.props.lista);
    }

    renderRows() {
        const lista = this.props.lista || []
        return lista.map(acervo => (
            <div className="arvore-acervo-item" key={"acervo_"+acervo.id}> 
                <input type="checkbox" name="acervo_{acervo.id}" id="{acervo.id}"/> 
                <div className="texto">{acervo.descricao} </div>
                {this.itensCategoria(acervo)}
            </div>
        ));
    }

    itensCategoria(acervo){
        console.log(acervo.categorias);
        return acervo.categorias.map( categoria => (
            <div className="arvore-categoria-item" key={"categoriaid_"+categoria.id}>
                <input type="checkbox" name={"categoria_input"+categoria.id} id={"categoria_input_"+categoria.id}/> {categoria.descricao}
            </div>
        ));
    }

    render() {
        return (
            <div>
                {this.renderRows()}
            </div>
        );
    }
}

const mapStateToProps = state => ({lista: state.acervos.lista});
const mapDispatchToProps = dispatch => bindActionCreators({load}, dispatch); 
export default connect(mapStateToProps, mapDispatchToProps)(ArvoreAcervo) ;

