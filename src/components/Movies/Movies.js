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
            datosVir: [],
            datosDel: [],
            modoVista: "modoCuadro",
            empty:"Cargando...",
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
                    datosVir: data.results,
                    nextPage: data.page
                }
            ))
            .catch(error => console.log('El error es este: ' + error))
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

    filtrarPersonajes(texto){
        let datosBorrados = this.state.datosBkp.filter(datos => !this.state.datosDel.includes(datos.id))
        let datosFiltrados = datosBorrados.filter(dato=>dato.title.toUpperCase().includes(texto))
        this.setState({
            datosVir:datosFiltrados
        })
        texto === "" ? this.setState({empty:"Cargando..."}) : this.setState({empty:"No se encuentran películas con ese título"})
    }

    borrarCard(id){
        let datosBorrados = this.state.datosDel
        this.state.datos.map(datos=>datos.id === id ? datosBorrados.push(datos.id) : "")
        let datosFiltrados = this.state.datosVir.filter(datos => !this.state.datosDel.includes(datos.id))
        this.setState({
            datosDel: datosBorrados,
            datos: datosFiltrados,
            datosVir: datosFiltrados
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
                    datosVir: this.state.datosVir.concat(data.results),
                    nextPage: data.page
                }
            ))
            .catch(error => console.log('El error es este: ' + error))
    }

    render(){
        console.log(this.state.datosDel);
        return(
            <React.Fragment> 
                <h3 className='h3'>Últimos estrenos</h3>
                <button onClick={()=>this.modoLista()} className="formato"><img src="https://st4.depositphotos.com/14846838/20430/v/600/depositphotos_204302882-stock-illustration-content-or-text-into-a.jpg"/></button>
                <button onClick={()=>this.modoCuadro()} className="formato"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBFwKSJO2oI0V152AoswB5nPqq7oppqbbEexQuIg83i0VKpsUEe8dmySGvzCrxLhNrKVk&usqp=CAU"/></button>
                <Form filtrarPersonajes={(textoABuscar)=>this.filtrarPersonajes(textoABuscar)} />
                <button onClick={() => this.cargarMas()} >Cargar más</button>
                <div className='row card-container'>  
                    {
                        this.state.datosVir.length === 0 ? 
                        <h3>{this.state.empty}</h3> : 
                        this.state.datosVir.map((oneMovie, idx) => <Card key={oneMovie.title + idx} movieInfo={oneMovie} modoVista={this.state.modoVista} borrar={(id) => this.borrarCard(id)}/>)
                    }  
                </div>   
            </React.Fragment>
        )
    }
}

export default Movies