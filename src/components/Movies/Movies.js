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
            modoVista: "modoCuadro",
            nextPage: ''
        }  
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=a52f1f77a09feddf44639ff31672804a&language=en-US&page=1')
            .then(response => response.json())
            .then(data => this.setState(
                {
                    datos: data.results, 
                    datosBkp: data.results,
                    nextPage: data.page
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

    borrarCard(id){
        let datosFiltrados = this.state.datos.filter(dato => dato.id !== id)
        this.setState({
            datos: datosFiltrados
        })
        console.log(this.state.datos.length);
    }

    cargarMas(){
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=a52f1f77a09feddf44639ff31672804a&language=en-US&page=' + this.state.nextPage + 1)
            .then(response => response.json())
            .then(data => this.setState(
                {
                    datos: this.state.datos.concat(data.results),
                    datosBkp: this.state.datosBkp.concat(data.results),
                    nextPage: data.page
                }
            ))
            .catch(error => console.log('El error es este: ' + error))
    }

    render(){
        //console.log(this.state.nextPage);
        return(
            <React.Fragment> 
                <h3 className='h3'>Últimos estrenos</h3>
                <button onClick={()=>this.modoLista()} className="formato"><img src="https://st4.depositphotos.com/14846838/20430/v/600/depositphotos_204302882-stock-illustration-content-or-text-into-a.jpg"/></button>
                <button onClick={()=>this.modoCuadro()} className="formato"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBFwKSJO2oI0V152AoswB5nPqq7oppqbbEexQuIg83i0VKpsUEe8dmySGvzCrxLhNrKVk&usqp=CAU"/></button>
                <Form filtrarPersonajes={(textoABuscar)=>this.filtrarPersonajes(textoABuscar)} />
                <button onClick={() => this.cargarMas()} >Cargar más</button>
                <div className='row card-container'>  
                    {
                        this.state.datos.length === 0 ? 
                        (this.state.datosBkp === this.state.datos ? <h2>Cargando...</h2> : <h2>No hay datos que coincidan con su búsqueda</h2>) : 
                        this.state.datos.map((oneMovie, idx) => <Card key={oneMovie.title + idx} movieInfo={oneMovie} modoVista={this.state.modoVista} borrar={(id) => this.borrarCard(id)}/>)
                    }  
                </div>   
            </React.Fragment>
        )
    }
}

export default Movies