import React, {Component} from 'react';

class Form extends Component {
    constructor(props){
        super(props)
        this.state={
            value:""
        }
    }
    pDef(event){
        event.preventDefault();
        console.log(this.state.formText.toUpperCase());
        this.setState({
            characters: this.state.characters.filter(word => word.name.toUpperCase().indexOf(this.state.formText.toUpperCase())!==-1)
        })
    }
    fChange(event){
        this.setState({
            value: event.target.value,
        }, () => this.props.filtrarPersonajes(this.state.value.toUpperCase()))
        console.log(this.state.value)
        
    }
    render(){
        return(
            <form onSubmit={(event)=>this.pDef(event)} className="mb-4">
                <input onChange={(event)=>this.fChange(event)} value={this.props.value} />
                <button type="submit">Enviar</button>
            </form>
        )
    }
}

export default Form;