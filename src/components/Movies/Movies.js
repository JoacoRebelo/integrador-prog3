import React, {Component} from 'react';
import Card from '../Card/Card';

class Movies extends Component {
    constructor(){
        super()
        this.state = {
            datos: [],
            datosBkp: [],
            nextPage: ''
        }  
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=a52f1f77a09feddf44639ff31672804a&language=en-US&page=1')
            .then(response => response.json())
            .then(data => this.setState(
                {
                    datos: data.results, 
                }
            ))
            .catch(error => console.log('El error es este: ' + error))
    }
    render(){
        console.log(this.state.datos);
        return(
            <React.Fragment> 
                <div className='row card-container'>  
                    {
                        this.state.datos.length === 0 ? 
                        <h3>Cargando...</h3> : 
                        this.state.datos.map((oneMovie, idx) => <Card key={oneMovie.title + idx} movieInfo={oneMovie} />)
                    }  
                </div>   
            </React.Fragment>
        )
    }
}

export default Movies