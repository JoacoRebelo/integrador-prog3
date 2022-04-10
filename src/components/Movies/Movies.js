import React, {Component} from 'react';
import Card from '../Card/Card';
import Form from '../Form/Form'
import "./style.css"

class Movies extends Component {
    constructor(){
        super()
        this.state = {
            datos: [],
            datosBkp: [],
            nextPage: '',
            modoVista: "modoCuadro",
        }  
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=a52f1f77a09feddf44639ff31672804a&language=en-US&page=1')
            .then(response => response.json())
            .then(data => this.setState(
                {
                    datos: data.results, 
                    datosBkp: data.results
                }
            ))
            .catch(error => console.log('El error es este: ' + error))
    }

    filtrarPersonajes(texto){
        let datosFiltrados = this.state.datosBkp.filter(dato=>dato.title.toUpperCase().includes(texto))
        this.setState({
            datos:datosFiltrados
        })
    }

    modoLista(){
        this.setState({
            modoVista:"modoLista"
        })
    }
    modoCuadro(){
        this.setState({
            modoVista:"modoCuadro"
        })   
    }

    render(){
        console.log(this.state.datos);
        return(
            <React.Fragment> 
                <h3 className='h3'>Últimos estrenos</h3>
                <button onClick={()=>this.modoLista()} className="formato"><img src="https://st4.depositphotos.com/14846838/20430/v/600/depositphotos_204302882-stock-illustration-content-or-text-into-a.jpg"/></button>
                <button onClick={()=>this.modoCuadro()} className="formato"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBFwKSJO2oI0V152AoswB5nPqq7oppqbbEexQuIg83i0VKpsUEe8dmySGvzCrxLhNrKVk&usqp=CAU"/></button>
                <Form filtrarPersonajes={(textoABuscar)=>this.filtrarPersonajes(textoABuscar)} />
                <div className='row card-container'>  
                    {
                        this.state.datos.length === 0 ? 
                        (this.state.datosBkp === this.state.datos ? <h2>Cargando...</h2> : <h2>No hay datos que coincidan con su búsqueda</h2>) : 
                        this.state.datos.map((oneMovie, idx) => <Card key={oneMovie.title + idx} movieInfo={oneMovie} modoVista={this.state.modoVista}/>)
                    }  
                </div>   
            </React.Fragment>
        )
    }
}

export default Movies